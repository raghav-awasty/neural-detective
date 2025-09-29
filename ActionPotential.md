# ⚡️ Activity: Neural Detective – The Broken Circuit

## 🧾 Storyline

You are neuroscientists investigating a patient with abnormal reflexes. The patient’s neurons may be **“malfunctioning”** because of incorrect thresholds, faulty resets, or weak stimuli. Your task is to **simulate these neurons in code** and figure out what’s wrong with them.

Each team gets a **case file** (different faulty neuron parameters). By running the simulation, analyzing the spiking behavior, and adjusting the model, you must diagnose the fault.

---

## 🎯 Learning Objectives

By the end of this activity, students will:

1. Understand how thresholds and resets affect firing behavior.
2. Simulate neuron voltage changes over time.
3. Diagnose abnormal firing patterns (too frequent, too rare, or none at all).
4. Practice debugging and iterative parameter testing.
5. Connect biological malfunction to computational logic.

---

## 🧱 Starter Code (with Fault Injection)

```python
import random

# --- Neuron represented as a dictionary ---
def make_neuron(voltage=-70, threshold=-55, spike_voltage=30, reset_voltage=-70, stimulus=5):
    return {
        "voltage": voltage,
        "threshold": threshold,
        "spike_voltage": spike_voltage,
        "reset_voltage": reset_voltage,
        "stimulus": stimulus,
        "spikes": 0
    }

def simulate(neuron, steps=10):
    print("\n--- Simulation Start ---")
    for t in range(steps):
        print(f"Time Step {t+1}")

        # Add stimulus each step
        neuron["voltage"] += neuron["stimulus"]

        # Check if threshold crossed
        if neuron["voltage"] >= neuron["threshold"]:
            print("Spike!")
            neuron["voltage"] = neuron["reset_voltage"]  # reset after spike
            neuron["spikes"] += 1
        else:
            print("Voltage:", neuron["voltage"])

    print("--- Simulation End ---")
    print(f"Total spikes: {neuron['spikes']}")
    return neuron


# --- CASE FILES (faulty neurons) ---

# Case A: Too high threshold (neuron never fires)
neuron_case_A = make_neuron(threshold=-20)

# Case B: Too low threshold (neuron fires continuously)
neuron_case_B = make_neuron(threshold=-80)

# Case C: Wrong reset potential (neuron stays depolarized)
neuron_case_C = make_neuron(reset_voltage=-40)

# Case D: Weak stimulus (neuron rarely fires)
neuron_case_D = make_neuron(stimulus=2)

# TODO: Uncomment one case at a time to investigate
neuron = neuron_case_A
simulate(neuron)
```

---

## 🕵️ Student Task

1. Run the code with each **case file** (`A`, `B`, `C`, `D`).
2. Observe the firing behavior:

   * Does it fire too often?
   * Does it never fire?
   * Does it fail to reset?
   * Does it respond too weakly?
3. **Diagnose the fault**: Which parameter (threshold, reset, stimulus) is causing the problem?
4. Suggest a **fix**: What parameter value should be used for “normal” neuron behavior?
5. Bonus: Design your own faulty neuron and let another team diagnose it.

---

## ✅ Expected Output Patterns

* **Case A (High Threshold)**: Voltage rises but never crosses threshold → 0 spikes.
* **Case B (Low Threshold)**: Fires almost every step → “Spike!” at every time step.
* **Case C (Bad Reset)**: Fires once, then fails to return to resting → abnormal firing pattern.
* **Case D (Weak Stimulus)**: Voltage climbs too slowly → maybe 1 spike in 10 steps.

---

## 🧑‍🏫 Teacher Notes

* This is **scaffolded**: students don’t need to modify the logic, just **observe, interpret, and explain**.
* Extensions:

  * Ask them to “normalize” each case by fixing the faulty parameter.
  * Chain multiple neurons together (Case B could simulate epilepsy-like runaway firing).
* Encourage teams to **swap case files** and “diagnose each other’s patients.”

---

👉 Do you want me to expand this into a **full handout format** (with intro text, rubric, instructions, and report template for student answers) like your DNA murder-investigation activity? Or keep it as a coding lab script with guided questions?
