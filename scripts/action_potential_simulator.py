#!/usr/bin/env python3
"""
Neural Detective - Action Potential Simulator
==============================================

A comprehensive simulation tool for studying action potential behavior in neurons.
This script allows students to investigate different neuron parameters and diagnose
malfunctioning neurons through interactive simulation and visualization.

Author: Neural Detective Activity Team
Course: Biology & Computer Science Collaboration
"""

import json
import matplotlib.pyplot as plt
import numpy as np
import argparse
from typing import Dict, List, Tuple
from pathlib import Path


class Neuron:
    """
    A class representing a neuron with configurable parameters for action potential simulation.
    """
    
    def __init__(self, voltage=-70, threshold=-55, spike_voltage=30, 
                 reset_voltage=-70, stimulus=5, name="Unknown"):
        """
        Initialize a neuron with specified parameters.
        
        Args:
            voltage (float): Initial membrane voltage (mV)
            threshold (float): Threshold voltage for action potential (mV)
            spike_voltage (float): Peak voltage during spike (mV)
            reset_voltage (float): Reset voltage after spike (mV)
            stimulus (float): Stimulus strength per time step (mV)
            name (str): Name/identifier for this neuron case
        """
        self.voltage = voltage
        self.threshold = threshold
        self.spike_voltage = spike_voltage
        self.reset_voltage = reset_voltage
        self.stimulus = stimulus
        self.name = name
        self.spikes = 0
        self.voltage_history = []
        self.spike_times = []
    
    def reset_history(self):
        """Reset the simulation history."""
        self.spikes = 0
        self.voltage_history = []
        self.spike_times = []
    
    def step(self, time_step):
        """
        Simulate one time step of the neuron.
        
        Args:
            time_step (int): Current time step
            
        Returns:
            bool: True if a spike occurred, False otherwise
        """
        # Add stimulus
        self.voltage += self.stimulus
        
        # Record voltage before potential spike
        self.voltage_history.append(self.voltage)
        
        # Check for action potential
        if self.voltage >= self.threshold:
            # Spike occurred
            self.voltage = self.spike_voltage  # Brief peak
            self.voltage_history[-1] = self.spike_voltage  # Update history
            self.voltage = self.reset_voltage  # Reset
            self.spikes += 1
            self.spike_times.append(time_step)
            return True
        
        return False
    
    def simulate(self, steps=20, verbose=True):
        """
        Run a complete simulation for the specified number of steps.
        
        Args:
            steps (int): Number of time steps to simulate
            verbose (bool): Whether to print detailed output
            
        Returns:
            dict: Simulation results including spike count and patterns
        """
        self.reset_history()
        
        if verbose:
            print(f"\n--- Simulation Start: {self.name} ---")
            print(f"Parameters: Threshold={self.threshold}mV, Reset={self.reset_voltage}mV, Stimulus={self.stimulus}mV")
            print("-" * 50)
        
        for t in range(steps):
            spike_occurred = self.step(t)
            
            if verbose:
                if spike_occurred:
                    print(f"Time {t+1:2d}: SPIKE! ⚡ (Reset to {self.reset_voltage}mV)")
                else:
                    print(f"Time {t+1:2d}: Voltage = {self.voltage:.1f}mV")
        
        if verbose:
            print("-" * 50)
            print(f"Total spikes: {self.spikes}")
            print(f"Firing rate: {self.spikes/steps*100:.1f}% of time steps")
            
            if self.spikes > 0:
                inter_spike_intervals = np.diff(self.spike_times) if len(self.spike_times) > 1 else []
                if len(inter_spike_intervals) > 0:
                    print(f"Average inter-spike interval: {np.mean(inter_spike_intervals):.1f} time steps")
        
        return {
            'name': self.name,
            'spikes': self.spikes,
            'firing_rate': self.spikes/steps,
            'voltage_history': self.voltage_history,
            'spike_times': self.spike_times,
            'parameters': {
                'threshold': self.threshold,
                'reset_voltage': self.reset_voltage,
                'stimulus': self.stimulus
            }
        }
    
    def diagnose(self, steps=20):
        """
        Analyze the neuron's behavior and provide diagnostic information.
        
        Args:
            steps (int): Number of steps to use for analysis
            
        Returns:
            dict: Diagnostic information and recommendations
        """
        results = self.simulate(steps, verbose=False)
        
        diagnosis = {
            'case': self.name,
            'problem': 'Unknown',
            'explanation': '',
            'recommendation': '',
            'severity': 'Normal'
        }
        
        firing_rate = results['firing_rate']
        
        if firing_rate == 0:
            diagnosis['problem'] = 'No Action Potentials'
            diagnosis['severity'] = 'Critical'
            if self.threshold > -40:
                diagnosis['explanation'] = 'Threshold voltage is too high - neuron cannot reach firing threshold'
                diagnosis['recommendation'] = f'Lower threshold from {self.threshold}mV to around -55mV'
            elif self.stimulus < 3:
                diagnosis['explanation'] = 'Stimulus is too weak to reach threshold'
                diagnosis['recommendation'] = f'Increase stimulus from {self.stimulus}mV to around 5-10mV'
        
        elif firing_rate > 0.8:
            diagnosis['problem'] = 'Hyperexcitability'
            diagnosis['severity'] = 'Critical'
            if self.threshold < -75:
                diagnosis['explanation'] = 'Threshold voltage is too low - neuron fires too easily'
                diagnosis['recommendation'] = f'Raise threshold from {self.threshold}mV to around -55mV'
            elif self.reset_voltage > -60:
                diagnosis['explanation'] = 'Reset voltage is too high - neuron stays near threshold'
                diagnosis['recommendation'] = f'Lower reset voltage from {self.reset_voltage}mV to around -70mV'
        
        elif firing_rate < 0.2 and firing_rate > 0:
            diagnosis['problem'] = 'Hypoexcitability'
            diagnosis['severity'] = 'Mild'
            diagnosis['explanation'] = 'Neuron fires but less frequently than normal'
            if self.stimulus < 5:
                diagnosis['recommendation'] = f'Consider increasing stimulus from {self.stimulus}mV'
        
        else:
            diagnosis['problem'] = 'Normal Function'
            diagnosis['explanation'] = 'Neuron shows healthy firing patterns'
            diagnosis['recommendation'] = 'No adjustments needed'
        
        return diagnosis


def load_case_files(data_dir="data"):
    """
    Load neuron case files from JSON data.
    
    Args:
        data_dir (str): Directory containing case files
        
    Returns:
        dict: Dictionary of case names to Neuron objects
    """
    cases = {}
    data_path = Path(data_dir)
    
    if not data_path.exists():
        print(f"Warning: Data directory '{data_dir}' not found. Using default cases.")
        return create_default_cases()
    
    for case_file in data_path.glob("case_*.json"):
        try:
            with open(case_file, 'r') as f:
                case_data = json.load(f)
                cases[case_data['name']] = Neuron(**case_data['parameters'], name=case_data['name'])
        except Exception as e:
            print(f"Warning: Could not load {case_file}: {e}")
    
    return cases if cases else create_default_cases()


def create_default_cases():
    """Create the default neuron cases from the original activity."""
    return {
        'Case A': Neuron(threshold=-20, name='Case A - High Threshold'),
        'Case B': Neuron(threshold=-80, name='Case B - Low Threshold'),
        'Case C': Neuron(reset_voltage=-40, name='Case C - Poor Reset'),
        'Case D': Neuron(stimulus=2, name='Case D - Weak Stimulus'),
        'Normal': Neuron(name='Normal Neuron')
    }


def plot_neuron_activity(neuron_results, save_path=None):
    """
    Create a visualization of neuron activity over time.
    
    Args:
        neuron_results (list): List of simulation results from multiple neurons
        save_path (str): Optional path to save the plot
    """
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))
    
    # Plot voltage traces
    for result in neuron_results:
        time_steps = range(1, len(result['voltage_history']) + 1)
        ax1.plot(time_steps, result['voltage_history'], 
                label=result['name'], linewidth=2, marker='o', markersize=4)
    
    ax1.axhline(y=-55, color='red', linestyle='--', alpha=0.7, label='Normal Threshold')
    ax1.set_xlabel('Time Step')
    ax1.set_ylabel('Membrane Voltage (mV)')
    ax1.set_title('Neuron Voltage Traces Over Time')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Plot spike counts
    names = [result['name'] for result in neuron_results]
    spike_counts = [result['spikes'] for result in neuron_results]
    colors = plt.cm.viridis(np.linspace(0, 1, len(names)))
    
    bars = ax2.bar(names, spike_counts, color=colors)
    ax2.set_xlabel('Neuron Case')
    ax2.set_ylabel('Total Spikes')
    ax2.set_title('Spike Count Comparison')
    ax2.tick_params(axis='x', rotation=45)
    
    # Add value labels on bars
    for bar, count in zip(bars, spike_counts):
        height = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'{count}', ha='center', va='bottom')
    
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Plot saved to: {save_path}")
    
    plt.show()


def generate_report(cases, results, output_file="simulation_report.txt"):
    """
    Generate a comprehensive report of the simulation results.
    
    Args:
        cases (dict): Dictionary of neuron cases
        results (list): List of simulation results
        output_file (str): Path to output report file
    """
    with open(output_file, 'w') as f:
        f.write("NEURAL DETECTIVE - SIMULATION REPORT\n")
        f.write("=" * 50 + "\n\n")
        
        for result in results:
            case_name = result['name']
            neuron = cases[case_name.split(' - ')[0]] if ' - ' in case_name else cases.get(case_name)
            
            if neuron:
                diagnosis = neuron.diagnose()
                
                f.write(f"CASE: {result['name']}\n")
                f.write("-" * 30 + "\n")
                f.write(f"Parameters:\n")
                f.write(f"  • Threshold: {result['parameters']['threshold']} mV\n")
                f.write(f"  • Reset Voltage: {result['parameters']['reset_voltage']} mV\n")
                f.write(f"  • Stimulus: {result['parameters']['stimulus']} mV\n\n")
                
                f.write(f"Results:\n")
                f.write(f"  • Total Spikes: {result['spikes']}\n")
                f.write(f"  • Firing Rate: {result['firing_rate']*100:.1f}%\n")
                f.write(f"  • Spike Times: {result['spike_times']}\n\n")
                
                f.write(f"Diagnosis:\n")
                f.write(f"  • Problem: {diagnosis['problem']}\n")
                f.write(f"  • Severity: {diagnosis['severity']}\n")
                f.write(f"  • Explanation: {diagnosis['explanation']}\n")
                f.write(f"  • Recommendation: {diagnosis['recommendation']}\n\n")
                f.write("=" * 50 + "\n\n")
    
    print(f"Detailed report saved to: {output_file}")


def main():
    """Main function to run the action potential simulator."""
    parser = argparse.ArgumentParser(description='Neural Detective - Action Potential Simulator')
    parser.add_argument('--case', type=str, help='Specific case to run (e.g., "Case A")')
    parser.add_argument('--all', action='store_true', help='Run all cases')
    parser.add_argument('--steps', type=int, default=20, help='Number of simulation steps')
    parser.add_argument('--plot', action='store_true', help='Generate visualization plots')
    parser.add_argument('--report', action='store_true', help='Generate detailed report')
    parser.add_argument('--data-dir', type=str, default='data', help='Directory containing case files')
    
    args = parser.parse_args()
    
    # Load cases
    cases = load_case_files(args.data_dir)
    
    print("🧠 Neural Detective - Action Potential Simulator")
    print("=" * 50)
    print("Available cases:")
    for name in cases.keys():
        print(f"  • {name}")
    print()
    
    results = []
    
    if args.case:
        # Run specific case
        if args.case in cases:
            result = cases[args.case].simulate(args.steps)
            results.append(result)
        else:
            print(f"Error: Case '{args.case}' not found!")
            return
    
    elif args.all:
        # Run all cases
        for case_name, neuron in cases.items():
            print(f"\n{'='*60}")
            result = neuron.simulate(args.steps)
            results.append(result)
    
    else:
        # Interactive mode
        print("Interactive Mode - Choose a case to investigate:")
        case_names = list(cases.keys())
        for i, name in enumerate(case_names, 1):
            print(f"{i}. {name}")
        
        try:
            choice = int(input("\nEnter your choice (number): ")) - 1
            if 0 <= choice < len(case_names):
                selected_case = case_names[choice]
                result = cases[selected_case].simulate(args.steps)
                results.append(result)
            else:
                print("Invalid choice!")
                return
        except ValueError:
            print("Please enter a valid number!")
            return
    
    # Generate outputs
    if args.plot and results:
        plot_neuron_activity(results)
    
    if args.report and results:
        generate_report(cases, results)
    
    print("\n🎯 Investigation complete! Remember to:")
    print("1. Observe the firing patterns")
    print("2. Identify the problem with each case")
    print("3. Suggest parameter fixes")
    print("4. Test your hypotheses!")


if __name__ == "__main__":
    main()