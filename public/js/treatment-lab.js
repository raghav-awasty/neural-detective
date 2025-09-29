/**
 * Neural Detective - Treatment Laboratory JavaScript
 * Handles diagnosis, treatment parameter adjustment, and effectiveness evaluation
 * Complete investigate → diagnose → treat workflow for neurological case studies
 */

class NeuralDetectiveApp {
    constructor() {
        this.currentCase = null;
        this.currentResults = null;
        this.voltageChart = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.initializeChart();
    }
    
    initializeElements() {
        // Get DOM elements
        this.caseSelect = document.getElementById('caseSelect');
        this.timeStepsSlider = document.getElementById('timeSteps');
        this.timeStepsValue = document.getElementById('timeStepsValue');
        this.runButton = document.getElementById('runSimulation');
        this.resetButton = document.getElementById('resetSimulation');
        this.showDiagnosisButton = document.getElementById('showDiagnosis');
        
        this.caseInfo = document.getElementById('caseInfo');
        this.caseDetails = document.getElementById('caseDetails');
        this.resultsSection = document.getElementById('resultsSection');
        this.spikeAnalysis = document.getElementById('spikeAnalysis');
        this.simulationLog = document.getElementById('simulationLog');
        this.diagnosisCard = document.getElementById('diagnosisCard');
        this.diagnosisContent = document.getElementById('diagnosisContent');
        
        this.voltageChartCanvas = document.getElementById('voltageChart');
        
        // Treatment laboratory elements
        this.treatmentSection = document.getElementById('treatmentSection');
        this.thresholdSlider = document.getElementById('thresholdSlider');
        this.thresholdValue = document.getElementById('thresholdValue');
        this.resetSlider = document.getElementById('resetSlider');
        this.resetValue = document.getElementById('resetValue');
        this.stimulusSlider = document.getElementById('stimulusSlider');
        this.stimulusValue = document.getElementById('stimulusValue');
        this.applyTreatmentButton = document.getElementById('applyTreatment');
        this.resetTreatmentButton = document.getElementById('resetTreatment');
        this.treatmentFeedback = document.getElementById('treatmentFeedback');
        
        // Store original case parameters for reset functionality
        this.originalParameters = null;
    }
    
    attachEventListeners() {
        // Case selection
        this.caseSelect.addEventListener('change', (e) => this.onCaseSelected(e.target.value));
        
        // Time steps slider
        this.timeStepsSlider.addEventListener('input', (e) => {
            this.timeStepsValue.textContent = e.target.value;
        });
        
        // Buttons
        this.runButton.addEventListener('click', () => this.runSimulation());
        this.resetButton.addEventListener('click', () => this.resetSimulation());
        this.showDiagnosisButton.addEventListener('click', () => this.showDiagnosis());
        
        // Treatment laboratory controls
        this.thresholdSlider.addEventListener('input', (e) => {
            this.thresholdValue.textContent = e.target.value;
        });
        
        this.resetSlider.addEventListener('input', (e) => {
            this.resetValue.textContent = e.target.value;
        });
        
        this.stimulusSlider.addEventListener('input', (e) => {
            this.stimulusValue.textContent = e.target.value;
        });
        
        this.applyTreatmentButton.addEventListener('click', () => this.applyTreatment());
        this.resetTreatmentButton.addEventListener('click', () => this.resetTreatment());
    }
    
    initializeChart() {
        const ctx = this.voltageChartCanvas.getContext('2d');
        this.voltageChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Membrane Voltage (mV)',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#2980b9',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Action Potential Trace',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                weight: '600'
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.9)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        cornerRadius: 8,
                        callbacks: {
                            title: function(context) {
                                return `Time Step: ${context[0].label}`;
                            },
                            label: function(context) {
                                const value = context.parsed.y;
                                const isSpike = value > 20; // Detect spikes
                                return `${context.dataset.label}: ${value.toFixed(1)}mV${isSpike ? ' ⚡' : ''}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time Step',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                            },
                            padding: {
                                top: 15
                            }
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Membrane Voltage (mV)',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                            },
                            padding: {
                                bottom: 15
                            }
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + 'mV';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        min: -100,
                        max: 50
                    }
                },
                elements: {
                    point: {
                        backgroundColor: function(context) {
                            const value = context.parsed.y;
                            return value > 20 ? '#e74c3c' : '#3498db'; // Red for spikes
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        
        // Add threshold line
        this.addThresholdLine(-55);
    }
    
    addThresholdLine(threshold) {
        if (this.voltageChart.options.plugins.annotation) {
            return; // Plugin already configured
        }
        
        // Add threshold line annotation if Chart.js annotation plugin is available
        if (window.Chart.register) {
            this.voltageChart.options.plugins.annotation = {
                annotations: {
                    thresholdLine: {
                        type: 'line',
                        yMin: threshold,
                        yMax: threshold,
                        borderColor: '#e74c3c',
                        borderWidth: 2,
                        borderDash: [10, 5],
                        label: {
                            content: `Threshold: ${threshold}mV`,
                            enabled: true,
                            position: 'end'
                        }
                    }
                }
            };
        }
    }
    
    onCaseSelected(caseName) {
        if (!caseName) {
            this.hideElements();
            return;
        }
        
        this.currentCase = caseName;
        const caseConfig = NeuralDetective.getCaseConfig(caseName);
        
        if (caseConfig) {
            this.displayCaseInfo(caseConfig);
            this.caseInfo.style.display = 'block';
            this.caseInfo.classList.add('fade-in-up');
            
            // Store original parameters and set up treatment laboratory
            this.originalParameters = { ...caseConfig.parameters };
            this.setupTreatmentLaboratory(caseConfig.parameters);
            this.treatmentSection.style.display = 'block';
            this.treatmentSection.classList.add('fade-in-up');
        }
    }
    
    displayCaseInfo(caseConfig) {
        this.caseDetails.innerHTML = `
            <div class="case-param">
                <span class="param-name">📋 Case Description:</span>
                <span class="param-value">${caseConfig.description}</span>
            </div>
            <div class="case-param">
                <span class="param-name">🧠 Biological Context:</span>
                <span class="param-value">${caseConfig.biologicalContext}</span>
            </div>
            <div class="case-param">
                <span class="param-name">🎯 Learning Objective:</span>
                <span class="param-value">${caseConfig.learningObjective}</span>
            </div>
            <div class="case-param">
                <span class="param-name">⚡ Threshold Voltage:</span>
                <span class="param-value">${caseConfig.parameters.threshold} mV</span>
            </div>
            <div class="case-param">
                <span class="param-name">🔄 Reset Voltage:</span>
                <span class="param-value">${caseConfig.parameters.resetVoltage} mV</span>
            </div>
            <div class="case-param">
                <span class="param-name">📈 Stimulus Strength:</span>
                <span class="param-value">${caseConfig.parameters.stimulus} mV per step</span>
            </div>
        `;
    }
    
    runSimulation() {
        if (!this.currentCase) {
            alert('Please select a case first!');
            return;
        }
        
        const steps = parseInt(this.timeStepsSlider.value);
        
        try {
            // Create neuron and run simulation
            const neuron = NeuralDetective.createNeuronFromCase(this.currentCase);
            this.currentResults = neuron.simulate(steps);
            
            // Update UI with results
            this.displayResults(this.currentResults);
            this.updateChart(this.currentResults);
            this.displaySimulationLog(this.currentResults.simulationLog);
            
            // Show results section
            this.resultsSection.style.display = 'block';
            this.resultsSection.classList.add('fade-in-up');
            
            // Show diagnosis card but hide content initially
            this.diagnosisCard.style.display = 'block';
            this.showDiagnosisButton.style.display = 'block';
            this.diagnosisContent.style.display = 'none';
            
            // Scroll to results
            this.resultsSection.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Simulation error:', error);
            alert('An error occurred during simulation. Please try again.');
        }
    }
    
    displayResults(results) {
        const firingRate = (results.firingRate * 100).toFixed(1);
        const avgInterval = results.spikeTimeSteps.length > 1 
            ? (results.spikeTimeSteps[results.spikeTimeSteps.length - 1] - results.spikeTimeSteps[0]) / (results.spikeTimeSteps.length - 1)
            : 0;
        
        this.spikeAnalysis.innerHTML = `
            <div class="spike-stat">
                <span class="stat-label">Total Spikes:</span>
                <span class="stat-value">${results.spikes}</span>
            </div>
            <div class="spike-stat">
                <span class="stat-label">Firing Rate:</span>
                <span class="stat-value">${firingRate}%</span>
            </div>
            <div class="spike-stat">
                <span class="stat-label">Spike Times:</span>
                <span class="stat-value">${results.spikeTimeSteps.length > 0 ? results.spikeTimeSteps.map(t => t + 1).join(', ') : 'None'}</span>
            </div>
            ${avgInterval > 0 ? `
                <div class="spike-stat">
                    <span class="stat-label">Avg Interval:</span>
                    <span class="stat-value">${avgInterval.toFixed(1)} steps</span>
                </div>
            ` : ''}
        `;
    }
    
    updateChart(results) {
        const labels = results.voltageHistory.map((_, index) => index + 1);
        
        // Update chart data
        this.voltageChart.data.labels = labels;
        this.voltageChart.data.datasets[0].data = results.voltageHistory;
        
        // Update threshold line if parameters changed
        const threshold = results.parameters.threshold;
        if (this.voltageChart.options.plugins.annotation) {
            this.voltageChart.options.plugins.annotation.annotations.thresholdLine.yMin = threshold;
            this.voltageChart.options.plugins.annotation.annotations.thresholdLine.yMax = threshold;
            this.voltageChart.options.plugins.annotation.annotations.thresholdLine.label.content = `Threshold: ${threshold}mV`;
        }
        
        // Color spike points red
        this.voltageChart.data.datasets[0].pointBackgroundColor = results.voltageHistory.map(voltage => 
            voltage > 20 ? '#e74c3c' : '#3498db'
        );
        
        this.voltageChart.update();
    }
    
    displaySimulationLog(logEntries) {
        const logHTML = logEntries.map(entry => {
            const entryClass = entry.type === 'spike' ? 'log-entry spike' : 'log-entry normal';
            return `<div class="${entryClass}">Time ${entry.timeStep.toString().padStart(2, ' ')}: ${entry.message}</div>`;
        }).join('');
        
        this.simulationLog.innerHTML = logHTML;
        
        // Auto-scroll to bottom
        this.simulationLog.scrollTop = this.simulationLog.scrollHeight;
    }
    
    showDiagnosis() {
        if (!this.currentResults) {
            return;
        }
        
        const neuron = NeuralDetective.createNeuronFromCase(this.currentCase);
        const diagnosis = neuron.diagnose(parseInt(this.timeStepsSlider.value));
        
        const severityClass = diagnosis.severity.toLowerCase();
        
        this.diagnosisContent.innerHTML = `
            <div class="diagnosis-item">
                <div class="diagnosis-label">🔍 Problem Identified:</div>
                <div class="diagnosis-value ${severityClass}">${diagnosis.problem}</div>
            </div>
            <div class="diagnosis-item">
                <div class="diagnosis-label">⚠️ Severity Level:</div>
                <div class="diagnosis-value ${severityClass}">${diagnosis.severity}</div>
            </div>
            <div class="diagnosis-item">
                <div class="diagnosis-label">📝 Explanation:</div>
                <div class="diagnosis-value">${diagnosis.explanation}</div>
            </div>
            <div class="diagnosis-item">
                <div class="diagnosis-label">💡 Recommended Fix:</div>
                <div class="diagnosis-value">${diagnosis.recommendation}</div>
            </div>
        `;
        
        this.diagnosisContent.style.display = 'block';
        this.diagnosisContent.classList.add('fade-in-up');
        this.showDiagnosisButton.style.display = 'none';
        
        // Add visual feedback
        if (diagnosis.severity === 'Critical') {
            this.diagnosisCard.style.borderLeft = '5px solid #e74c3c';
        } else if (diagnosis.severity === 'Mild') {
            this.diagnosisCard.style.borderLeft = '5px solid #f39c12';
        } else {
            this.diagnosisCard.style.borderLeft = '5px solid #27ae60';
        }
    }
    
    resetSimulation() {
        // Reset form
        this.caseSelect.selectedIndex = 0;
        this.timeStepsSlider.value = 20;
        this.timeStepsValue.textContent = '20';
        
        // Clear results
        this.currentCase = null;
        this.currentResults = null;
        
        // Hide elements
        this.hideElements();
        
        // Reset chart
        this.voltageChart.data.labels = [];
        this.voltageChart.data.datasets[0].data = [];
        this.voltageChart.update();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setupTreatmentLaboratory(parameters) {
        // Set sliders to original case parameters
        this.thresholdSlider.value = parameters.threshold;
        this.thresholdValue.textContent = parameters.threshold;
        
        this.resetSlider.value = parameters.resetVoltage;
        this.resetValue.textContent = parameters.resetVoltage;
        
        this.stimulusSlider.value = parameters.stimulus;
        this.stimulusValue.textContent = parameters.stimulus;
        
        // Hide feedback initially
        this.treatmentFeedback.style.display = 'none';
    }
    
    applyTreatment() {
        if (!this.currentCase) {
            console.error('No current case selected');
            return;
        }
        
        const steps = parseInt(this.timeStepsSlider.value);
        
        // Check if all slider elements exist
        if (!this.thresholdSlider || !this.resetSlider || !this.stimulusSlider) {
            console.error('Treatment sliders not found:', {
                thresholdSlider: !!this.thresholdSlider,
                resetSlider: !!this.resetSlider,
                stimulusSlider: !!this.stimulusSlider
            });
            alert('Treatment controls not initialized properly. Please refresh the page.');
            return;
        }
        
        // Get adjusted parameters from sliders (voltage fixed at -70mV)
        const adjustedParameters = {
            voltage: -70, // Fixed resting potential - not clinically adjustable
            threshold: parseFloat(this.thresholdSlider.value),
            resetVoltage: parseFloat(this.resetSlider.value),
            stimulus: parseFloat(this.stimulusSlider.value)
        };
        
        console.log('Applying treatment with parameters:', adjustedParameters);
        
        // Validate parameters
        if (isNaN(adjustedParameters.threshold) || 
            isNaN(adjustedParameters.resetVoltage) || isNaN(adjustedParameters.stimulus)) {
            console.error('Invalid parameters detected:', adjustedParameters);
            alert('Invalid parameter values detected. Please check the sliders.');
            return;
        }
        
        try {
            // Create neuron with adjusted parameters
            console.log('Creating adjusted neuron with:', {
                ...adjustedParameters,
                spikeVoltage: 30,
                name: `${this.currentCase} (Treated)`
            });
            
            const adjustedNeuron = new NeuralDetective.Neuron({
                ...adjustedParameters,
                spikeVoltage: 30,
                name: `${this.currentCase} (Treated)`
            });
            
            console.log('Neuron created successfully, running simulation...');
            
            // Run simulation with adjusted parameters
            const treatmentResults = adjustedNeuron.simulate(steps);
            
            console.log('Simulation completed:', treatmentResults);
            
            // Update UI with treatment results
            this.displayResults(treatmentResults);
            this.updateChart(treatmentResults);
            this.displaySimulationLog(treatmentResults.simulationLog);
            
            // Analyze treatment effectiveness
            this.analyzeTreatmentEffectiveness(adjustedParameters, treatmentResults);
            
            // Show results section
            this.resultsSection.style.display = 'block';
            this.resultsSection.classList.add('fade-in-up');
            
            // Hide original diagnosis, show new treatment results
            this.diagnosisCard.style.display = 'none';
            
            // Scroll to results
            this.resultsSection.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Treatment simulation error:', error);
            alert('An error occurred during treatment simulation. Please try again.');
        }
    }
    
    resetTreatment() {
        if (!this.originalParameters) {
            return;
        }
        
        // Reset sliders to original parameters
        this.setupTreatmentLaboratory(this.originalParameters);
        
        // Clear any treatment feedback
        this.treatmentFeedback.style.display = 'none';
    }
    
    analyzeTreatmentEffectiveness(adjustedParams, results) {
        const firingRate = results.firingRate;
        const normalRanges = {
            threshold: { min: -60, max: -50 },
            resetVoltage: { min: -75, max: -65 },
            stimulus: { min: 4, max: 6 }
        };
        
        // Calculate how many adjustable parameters are in normal range
        let parametersInRange = 0;
        const parameterAnalysis = [];
        
        // Only analyze the 3 clinically adjustable parameters
        const adjustableParams = {
            threshold: adjustedParams.threshold,
            resetVoltage: adjustedParams.resetVoltage,
            stimulus: adjustedParams.stimulus
        };
        
        for (const [param, value] of Object.entries(adjustableParams)) {
            const range = normalRanges[param];
            if (range && value >= range.min && value <= range.max) {
                parametersInRange++;
                parameterAnalysis.push({ param, status: 'normal', value });
            } else {
                parameterAnalysis.push({ param, status: 'abnormal', value, range });
            }
        }
        
        // Determine overall treatment effectiveness (3 adjustable parameters)
        let effectiveness, feedbackClass, icon;
        if (firingRate >= 0.15 && firingRate <= 0.4 && parametersInRange === 3) {
            effectiveness = 'Excellent Treatment!';
            feedbackClass = 'success';
            icon = '✅';
        } else if (firingRate >= 0.1 && firingRate <= 0.6 && parametersInRange >= 2) {
            effectiveness = 'Good Treatment';
            feedbackClass = 'warning';
            icon = '⚠️';
        } else {
            effectiveness = 'Treatment Needs Adjustment';
            feedbackClass = 'error';
            icon = '❌';
        }
        
        // Display feedback
        this.displayTreatmentFeedback(effectiveness, feedbackClass, icon, results, parameterAnalysis);
    }
    
    displayTreatmentFeedback(effectiveness, feedbackClass, icon, results, parameterAnalysis) {
        const firingRate = (results.firingRate * 100).toFixed(1);
        
        this.treatmentFeedback.className = `treatment-feedback ${feedbackClass}`;
        this.treatmentFeedback.innerHTML = `
            <h4>${icon} ${effectiveness}</h4>
            <div class="feedback-content">
                <p>Your treatment resulted in a firing rate of <strong>${firingRate}%</strong> 
                   (${results.spikes} spikes in ${results.steps} steps).</p>
                
                <div class="feedback-metrics">
                    <div class="feedback-metric">
                        <div class="metric-label">Firing Rate</div>
                        <div class="metric-value">${firingRate}%</div>
                    </div>
                    <div class="feedback-metric">
                        <div class="metric-label">Total Spikes</div>
                        <div class="metric-value">${results.spikes}</div>
                    </div>
                    <div class="feedback-metric">
                        <div class="metric-label">Parameters Fixed</div>
                        <div class="metric-value">${parameterAnalysis.filter(p => p.status === 'normal').length}/3</div>
                    </div>
                </div>
                
                ${feedbackClass === 'success' ? 
                    '<p><strong>🎉 Great job!</strong> You\'ve successfully restored normal neuronal function!</p>' :
                    '<p><strong>💡 Tip:</strong> Try adjusting parameters closer to the normal ranges shown below each slider.</p>'
                }
            </div>
        `;
        
        this.treatmentFeedback.style.display = 'block';
        this.treatmentFeedback.classList.add('fade-in-up');
    }
    
    hideElements() {
        this.caseInfo.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.diagnosisCard.style.display = 'none';
        this.treatmentSection.style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new NeuralDetectiveApp();
    
    // Add some visual feedback for better UX
    const cards = document.querySelectorAll('.card-base');
    
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Add pulse animation to run button when case is selected
    document.getElementById('caseSelect').addEventListener('change', (e) => {
        const runButton = document.getElementById('runSimulation');
        if (e.target.value) {
            runButton.classList.add('pulse');
            setTimeout(() => runButton.classList.remove('pulse'), 3000);
        }
    });
    
    console.log('🧠 Neural Detective Application initialized!');
});
