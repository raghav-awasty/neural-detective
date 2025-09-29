# ⚡️ Neural Detective: The Broken Circuit
## Student Investigation Handout

### 🧾 Mission Briefing

Welcome, Neural Detectives! You've been called to investigate a mysterious case at the Neural Research Hospital. Several patients are presenting with unusual neurological symptoms - their reflexes aren't working normally. As expert neuroscientists, your job is to simulate their neurons in code and figure out what's malfunctioning.

**Your Mission:** Diagnose faulty neurons by running computational simulations and analyzing the results.

---

### 🎯 Learning Goals

By completing this investigation, you will:

1. **Understand Action Potentials**: Learn how neurons generate electrical signals
2. **Explore Threshold Effects**: See how voltage thresholds control neuron firing
3. **Investigate Reset Mechanisms**: Discover why proper repolarization matters
4. **Analyze Stimulus Strength**: Understand how input affects neuronal responses
5. **Practice Scientific Debugging**: Use systematic approaches to diagnose problems
6. **Connect Biology to Code**: See how computational models help us understand biology

---

### 🧬 Background: How Neurons Work

Before diving into the investigation, let's review the basics:

**Resting Potential**: Healthy neurons maintain a voltage of about -70mV when at rest.

**Threshold**: When stimulated, if the neuron's voltage reaches about -55mV, it fires an action potential.

**Action Potential**: The neuron's voltage rapidly spikes to +30mV, then resets.

**Reset/Repolarization**: After firing, the neuron returns to its resting potential (-70mV).

**Stimulus**: External input that increases the neuron's voltage each time step.

---

### 🔍 The Case Files

You have **four mystery patients** to investigate, plus one healthy control for comparison:

#### **Case A - Mystery Patient #1**
*Symptoms*: Complete loss of reflexes, no response to stimuli
*Your Job*: Find out why this neuron never fires

#### **Case B - Mystery Patient #2** 
*Symptoms*: Hyperactive reflexes, seizure-like activity
*Your Job*: Determine why this neuron fires too much

#### **Case C - Mystery Patient #3**
*Symptoms*: Abnormal reflex patterns, prolonged responses
*Your Job*: Identify the reset mechanism problem

#### **Case D - Mystery Patient #4**
*Symptoms*: Weak reflexes, delayed responses
*Your Job*: Figure out the input sensitivity issue

#### **Normal Control**
*Reference*: Healthy neuron for comparison

---

### 🛠️ Investigation Tools

You have two main tools for your investigation:

#### **1. Web Interface** (`src/index.html`)
- Interactive simulation with visual charts
- Real-time parameter display
- Automated diagnosis system
- Perfect for exploration and presentation

#### **2. Python Command Line** (`scripts/action_potential_simulator.py`)
- Detailed simulation control
- Advanced visualization options
- Batch processing capabilities  
- Ideal for deep analysis

---

### 📝 Investigation Protocol

Follow these steps for each case:

#### **Step 1: Initial Observation**
1. Select a patient case
2. Run the simulation with default parameters (20 time steps)
3. Record your observations:
   - How many spikes occurred?
   - What was the firing pattern?
   - Did anything look abnormal?

#### **Step 2: Parameter Analysis**
Review the patient's neuron parameters:
- **Threshold Voltage**: ___ mV
- **Reset Voltage**: ___ mV  
- **Stimulus Strength**: ___ mV per step
- **Initial Voltage**: ___ mV

#### **Step 3: Pattern Recognition**
Compare your results to these known patterns:

| Problem Type | Spike Count | Pattern | Likely Cause |
|--------------|-------------|---------|--------------|
| High Threshold | 0 spikes | Voltage rises but never fires | Threshold too high |
| Low Threshold | Many spikes | Fires almost every step | Threshold too low |
| Bad Reset | Irregular | Fires once then abnormal pattern | Reset voltage wrong |
| Weak Stimulus | Few spikes | Voltage climbs very slowly | Stimulus too weak |

#### **Step 4: Hypothesis Formation**
Based on your observations, hypothesize:
- Which parameter is faulty?
- What would a normal value be?
- How would you fix this neuron?

#### **Step 5: Diagnosis Verification**
Use the "Reveal Diagnosis" feature to check your hypothesis!

---

### 📊 Data Collection Sheet

Use this template to record your findings:

```
CASE: ________________

PARAMETERS:
- Threshold: _____ mV
- Reset: _____ mV  
- Stimulus: _____ mV
- Simulation Steps: _____

OBSERVATIONS:
- Total Spikes: _____
- Firing Rate: _____%
- Spike Timing: ___________
- Pattern Description: 
  _________________________

DIAGNOSIS:
- Problem Identified: ___________
- Faulty Parameter: ___________
- Recommended Fix: ___________
- Confidence Level: _____ / 10

BIOLOGICAL SIGNIFICANCE:
- What might this represent in a real patient?
  _________________________
- How would this affect their daily life?
  _________________________
```

---

### 🧪 Advanced Investigations

Once you've solved the basic cases, try these challenges:

#### **Challenge 1: Parameter Tuning**
- Take a faulty neuron and gradually adjust parameters
- Find the exact threshold between normal and abnormal firing
- Plot how small changes affect behavior

#### **Challenge 2: Custom Case Creation**
- Design your own faulty neuron
- Give it to a classmate to diagnose
- See if they can identify your intentional "malfunction"

#### **Challenge 3: Time Analysis**
- Run longer simulations (50+ steps)
- Look for patterns that only emerge over time
- Calculate inter-spike intervals and firing frequencies

#### **Challenge 4: Comparative Study**
- Run all cases with identical parameters except one
- Create side-by-side comparisons
- Quantify the impact of each parameter

---

### 💡 Thinking Questions

As you work through the cases, consider these deeper questions:

1. **Biological Relevance**: If these were real patients, what conditions might cause these parameter changes?

2. **Treatment Options**: How might doctors treat each type of neuronal dysfunction?

3. **Evolutionary Perspective**: Why might neurons have evolved these specific parameter ranges?

4. **Systems Thinking**: How would these individual neuron problems affect entire neural networks?

5. **Modeling Limitations**: What aspects of real neurons are simplified in our simulation?

---

### 🎯 Success Criteria

You've successfully completed the investigation when you can:

- [ ] Correctly identify the problem in each case
- [ ] Explain which parameter is faulty and why
- [ ] Suggest appropriate parameter fixes
- [ ] Describe the biological significance of each malfunction
- [ ] Compare normal vs. abnormal firing patterns
- [ ] Use appropriate scientific vocabulary
- [ ] Work collaboratively to discuss findings

---

### 🚀 Extension Activities

#### **For Fast Finishers:**
- Research real neurological conditions that might cause similar symptoms
- Explore how different neurotransmitters might affect these parameters
- Design experiments to test your parameter fix hypotheses

#### **Research Projects:**
- Action potentials in different types of neurons
- How anesthetics affect neuronal firing
- The role of ion channels in setting thresholds
- Computational neuroscience careers

#### **Creative Connections:**
- Write a patient case study based on your findings
- Create analogies comparing neurons to electrical circuits
- Design educational materials for younger students

---

### 📚 Quick Reference

**Key Vocabulary:**
- **Action Potential**: The electrical signal neurons use to communicate
- **Threshold**: The voltage level that triggers an action potential  
- **Repolarization**: The process of returning to resting potential
- **Stimulus**: Input that changes the neuron's voltage
- **Firing Rate**: How often a neuron generates action potentials

**Normal Values:**
- Resting Potential: ~-70mV
- Threshold: ~-55mV
- Spike Peak: ~+30mV
- Typical Stimulus: 5-10mV per step

**Troubleshooting:**
- Can't see spikes? Check if threshold is too high
- Too many spikes? Check if threshold is too low  
- Weird patterns? Check reset voltage
- Slow response? Check stimulus strength

---

### 👥 Team Collaboration Tips

- **Divide and Conquer**: Each person takes 1-2 cases initially
- **Cross-Check**: Have teammates verify your diagnoses
- **Share Insights**: Discuss patterns you notice across cases
- **Peer Teaching**: Explain your findings to help others learn
- **Ask Questions**: Don't hesitate to seek help when stuck

---

**Remember**: Real scientific investigation requires patience, careful observation, and systematic thinking. Take your time, record detailed observations, and don't be afraid to run multiple trials!

Good luck, Neural Detectives! 🧠⚡️