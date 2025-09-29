/**
 * Neural Detective - Neuron Simulator JavaScript
 * Client-side implementation of the action potential simulation
 * Version: 2.1 - Fixed Case A parameters (threshold=50mV, stimulus=2mV) for ZERO spikes
 */

class Neuron {
    constructor(params = {}) {
        this.voltage = params.voltage ?? -70;
        this.threshold = params.threshold ?? -55;
        this.spikeVoltage = params.spikeVoltage ?? 30;
        this.resetVoltage = params.resetVoltage ?? -70;
        this.stimulus = params.stimulus ?? 5;
        this.name = params.name || "Unknown";
        
        // Simulation state
        this.spikes = 0;
        this.voltageHistory = [];
        this.spikeTimeSteps = [];
        this.simulationLog = [];
        
        this.reset();
    }
    
    reset() {
        this.spikes = 0;
        this.voltageHistory = [];
        this.spikeTimeSteps = [];
        this.simulationLog = [];
        this.voltage = this.voltage < 0 ? this.voltage : -70; // Ensure negative initial voltage
    }
    
    step(timeStep) {
        // Add stimulus
        this.voltage += this.stimulus;
        
        // Record voltage before potential spike
        this.voltageHistory.push(this.voltage);
        
        // Debug logging for first few steps
        if (timeStep < 5 || this.voltage >= this.threshold) {
            console.log(`[DEBUG] Step ${timeStep + 1}: voltage=${this.voltage.toFixed(1)}mV, threshold=${this.threshold}mV`);
        }
        
        // Check for action potential
        if (this.voltage >= this.threshold) {
            // Spike occurred
            this.voltage = this.spikeVoltage; // Brief peak
            this.voltageHistory[this.voltageHistory.length - 1] = this.spikeVoltage; // Update history
            this.voltage = this.resetVoltage; // Reset
            this.spikes++;
            this.spikeTimeSteps.push(timeStep);
            
            this.simulationLog.push({
                timeStep: timeStep + 1,
                type: 'spike',
                voltage: this.spikeVoltage,
                message: `SPIKE! ⚡ (Reset to ${this.resetVoltage}mV)`
            });
            
            return true;
        } else {
            this.simulationLog.push({
                timeStep: timeStep + 1,
                type: 'normal',
                voltage: this.voltage,
                message: `Voltage = ${this.voltage.toFixed(1)}mV`
            });
            
            return false;
        }
    }
    
    simulate(steps = 20) {
        this.reset();
        
        // Debug logging
        console.log(`[DEBUG] Simulating ${this.name}:`, {
            voltage: this.voltage,
            threshold: this.threshold,
            stimulus: this.stimulus,
            resetVoltage: this.resetVoltage
        });
        
        const results = {
            name: this.name,
            parameters: {
                threshold: this.threshold,
                resetVoltage: this.resetVoltage,
                stimulus: this.stimulus,
                initialVoltage: this.voltage
            },
            steps: steps,
            spikes: 0,
            firingRate: 0,
            voltageHistory: [],
            spikeTimeSteps: [],
            simulationLog: []
        };
        
        for (let t = 0; t < steps; t++) {
            this.step(t);
        }
        
        // Calculate final metrics
        results.spikes = this.spikes;
        results.firingRate = this.spikes / steps;
        results.voltageHistory = [...this.voltageHistory];
        results.spikeTimeSteps = [...this.spikeTimeSteps];
        results.simulationLog = [...this.simulationLog];
        
        return results;
    }
    
    diagnose(steps = 20) {
        const results = this.simulate(steps);
        const firingRate = results.firingRate;
        
        const diagnosis = {
            case: this.name,
            problem: 'Unknown',
            explanation: '',
            recommendation: '',
            severity: 'Normal',
            problemType: 'none'
        };
        
        // Check for specific parameter issues first
        if (this.resetVoltage > -50) {
            // Poor reset case - like Case C
            diagnosis.problem = 'Abnormal Reset Voltage';
            diagnosis.severity = 'Critical';
            diagnosis.problemType = 'poor-reset';
            diagnosis.explanation = 'Reset voltage is too high - neuron fails to properly repolarize after firing, leading to hyperexcitability';
            diagnosis.recommendation = `Lower reset voltage from ${this.resetVoltage}mV to around -70mV for proper repolarization`;
        } else if (firingRate === 0) {
            diagnosis.problem = 'No Action Potentials';
            diagnosis.severity = 'Critical';
            diagnosis.problemType = 'no-firing';
            
            if (this.threshold > -40) {
                diagnosis.explanation = 'Threshold voltage is too high - neuron cannot reach firing threshold';
                diagnosis.recommendation = `Lower threshold from ${this.threshold}mV to around -55mV`;
            } else if (this.stimulus < 3) {
                diagnosis.explanation = 'Stimulus is too weak to reach threshold';
                diagnosis.recommendation = `Increase stimulus from ${this.stimulus}mV to around 5-10mV`;
            } else {
                diagnosis.explanation = 'Neuron parameters prevent action potential generation';
                diagnosis.recommendation = 'Check threshold, stimulus, and reset voltage parameters';
            }
        } else if (firingRate > 0.8) {
            diagnosis.problem = 'Hyperexcitability';
            diagnosis.severity = 'Critical';
            diagnosis.problemType = 'hyperexcitable';
            
            if (this.threshold < -75) {
                diagnosis.explanation = 'Threshold voltage is too low - neuron fires too easily';
                diagnosis.recommendation = `Raise threshold from ${this.threshold}mV to around -55mV`;
            } else if (this.resetVoltage > -60) {
                diagnosis.explanation = 'Reset voltage is too high - neuron stays near threshold';
                diagnosis.recommendation = `Lower reset voltage from ${this.resetVoltage}mV to around -70mV`;
            } else {
                diagnosis.explanation = 'Neuron fires excessively due to parameter imbalance';
                diagnosis.recommendation = 'Adjust threshold or reset voltage to reduce excitability';
            }
        } else if (firingRate < 0.2 && firingRate > 0) {
            diagnosis.problem = 'Hypoexcitability';
            diagnosis.severity = 'Mild';
            diagnosis.problemType = 'hypoexcitable';
            diagnosis.explanation = 'Neuron fires but less frequently than normal';
            
            if (this.stimulus < 5) {
                diagnosis.recommendation = `Increase stimulus from ${this.stimulus}mV to around 5-8mV`;
            } else {
                diagnosis.recommendation = 'Consider lowering threshold or increasing stimulus strength';
            }
        } else {
            diagnosis.problem = 'Normal Function';
            diagnosis.explanation = 'Neuron shows healthy firing patterns with appropriate frequency';
            diagnosis.recommendation = 'No adjustments needed - parameters are within normal range';
            diagnosis.problemType = 'normal';
        }
        
        return diagnosis;
    }
    
    static fromCaseData(caseData) {
        return new Neuron({
            ...caseData.parameters,
            name: caseData.name
        });
    }
}

// Predefined case configurations
const CASE_CONFIGS = {
    'Case A': {
        name: 'Case A',
        description: 'High Threshold Neuron - A patient presenting with complete loss of reflexes',
        parameters: {
            voltage: -70,
            threshold: 0,
            spikeVoltage: 30,
            resetVoltage: -70,
            stimulus: 2
        },
        expectedProblem: 'No Action Potentials',
        biologicalContext: 'This could represent a neurological condition where sodium channels are blocked or the threshold for depolarization is pathologically high',
        learningObjective: 'Understand the critical role of threshold voltage in action potential generation'
    },
    'Case B': {
        name: 'Case B',
        description: 'Hyperexcitable Neuron - A patient with seizure-like hyperactivity',
        parameters: {
            voltage: -70,
            threshold: -80,
            spikeVoltage: 30,
            resetVoltage: -70,
            stimulus: 5
        },
        expectedProblem: 'Hyperexcitability',
        biologicalContext: 'This could represent conditions like epilepsy where neurons fire too easily due to altered ion channel properties or neurotransmitter imbalances',
        learningObjective: 'Learn how overly sensitive neurons can lead to pathological conditions'
    },
    'Case C': {
        name: 'Case C',
        description: 'Poor Reset Neuron - A patient with abnormal refractory periods',
        parameters: {
            voltage: -70,
            threshold: -55,
            spikeVoltage: 30,
            resetVoltage: -40,
            stimulus: 5
        },
        expectedProblem: 'Abnormal Reset',
        biologicalContext: 'This could represent dysfunction in potassium channels that are responsible for repolarization, leading to prolonged depolarization',
        learningObjective: 'Understand the importance of proper repolarization in normal neuronal function'
    },
    'Case D': {
        name: 'Case D',
        description: 'Weak Input Neuron - A patient with reduced sensory responses',
        parameters: {
            voltage: -70,
            threshold: -55,
            spikeVoltage: 30,
            resetVoltage: -70,
            stimulus: 2
        },
        expectedProblem: 'Hypoexcitability',
        biologicalContext: 'This could represent conditions where synaptic transmission is impaired, leading to weak or insufficient stimulation of neurons',
        learningObjective: 'Learn how stimulus strength affects the likelihood of action potential generation'
    },
    'Normal': {
        name: 'Normal',
        description: 'Healthy Neuron - Normal physiological parameters for comparison',
        parameters: {
            voltage: -70,
            threshold: -55,
            spikeVoltage: 30,
            resetVoltage: -70,
            stimulus: 5
        },
        expectedProblem: 'Normal Function',
        biologicalContext: 'This represents a healthy neuron with typical resting potential, threshold, and response characteristics',
        learningObjective: 'Establish baseline understanding of normal neuronal behavior for comparison with pathological cases'
    }
};

// Utility functions
function createNeuronFromCase(caseName) {
    const caseConfig = CASE_CONFIGS[caseName];
    if (!caseConfig) {
        throw new Error(`Unknown case: ${caseName}`);
    }
    return Neuron.fromCaseData(caseConfig);
}

function getCaseConfig(caseName) {
    return CASE_CONFIGS[caseName] || null;
}

function getAllCaseNames() {
    return Object.keys(CASE_CONFIGS);
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.Neuron = Neuron;
    window.NeuralDetective = {
        Neuron,
        CASE_CONFIGS,
        createNeuronFromCase,
        getCaseConfig,
        getAllCaseNames
    };
}