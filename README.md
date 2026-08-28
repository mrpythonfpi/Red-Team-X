# Red-Team-X




<img width="1254" height="1254" alt="1000215590" src="https://github.com/user-attachments/assets/6c7466bc-d757-4a3a-9311-c63f739881f6" />


  <!-- العنوان الرئيسي -->
  
<h1 align="center">
  🟥 Red-Team-X 🟥<br>
  <sub><i>By MrPYTHON • Red Team X ☣️</i></sub>
</h1>

> ⚠️ WARNING: This tool is forged in the dark.  
> 👁️ Built for real cyber operations — not beginners.  
> 🧠 If you fear the shadows… do not proceed.

---

## 💀 What is `Red-Team-X`?

`js.Red-Team-X` is a **stealth login analyzer & session hunter**, engineered for deep cyber reconnaissance.  

It slips through authentication layers like smoke, observing behavior, analyzing responses, and mapping hidden logic inside restricted systems.

This is not a simple script —  
**it’s a silent operative**, crafted for Red Team missions where precision matters more than brute force.

---

## ⚙️ Arsenal & Capabilities

🧠 **Ghost Session Engine**  

- Generates a new fingerprint every attempt  

- Unique UA, cookies, noise, and headers  

- Zero trace — zero repetition — zero detection

🧠 **Login Behavior Analyzer**  

- Detects hidden redirects  

- Reads server-side logic  

- Identifies weak validation flows  

- Maps response patterns in real time

🧠 **Session Verification Module**  

- Confirms login state via secondary endpoints

- Tracks cookie mutations  

- Detects silent auth bypasses

🧠 **Card Input Engine**  

- Reads massive lists from `cards.txt`  

- Auto-stops on first valid credential  

- Saves full logs + successful hits

🧠 **Cross‑Platform Execution**  

- Termux  

- Linux  

- Windows CMD  

- Same power everywhere

---

## 🧪 Installation

### 🔥 Termux

```bash
pkg update && pkg upgrade -y
pkg install git nodejs -y
npm install axios-cookiejar-support
npm install
git clone https://github.com/mrpythonfpi/Red-Team-X
cd Red-Team-X
node Red-Team-X.js
```

### 🐧 Linux (Ubuntu / Kali / Debian)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git nodejs npm -y
sudo npm install axios-cookiejar-support
sudo npm install
git clone https://github.com/mrpythonfpi/Red-Team-X
cd Red-Team-X
node Red-Team-X.js
```

### 🪟 Windows CMD / PowerShell

```cmd
git clone https://github.com/mrpythonfpi/Red-Team-X
cd Red-Team-X
node Red-Team-X.js
```

---

## 🚧 Start operating the device

<img width="1080" height="2400" alt="1000234980" src="https://github.com/user-attachments/assets/c776cc77-5b5b-49cd-9d1d-8227035d49bf" />


### ⚙️ Interactive Configuration Setup

When running the script, you will be prompted to provide the following network parameters:

| Parameter | Prompt Description | Example |

| :--- | :--- | :--- |

| **Base URL** | The root domain or IP of the login portal | `http://fh.net` |

| **Login Path** | The specific endpoint for authentication | `/login` |

| **Status Path** | The endpoint used for session/status checks | `/status.html` |

| **Request Method**| The HTTP method used for sending credentials | `POST` or `GET` |

| **Extra Fields** | Optional key-value parameters separated by `\|` | `domain=512k\|var=callBack` |




# 🕷️ MikroTik Card Generator

<img width="1080" height="2131" alt="451445023-8f2dfcd2-8944-40dc-9c66-5baa83b3b32c" src="https://github.com/user-attachments/assets/737bdb36-2d3f-4f4d-8ef0-1c2b764013aa" />





 ⚙️ 1. Overview
A Python utility designed to analyze and generate hotspot vouchers based on existing patterns:

* **Pattern Analysis:** Analyzes the numerical structure of 3 valid sample cards.
* 
* **Smart Generation:** Generates large batches of matching vouchers following the detected pattern
* 
* **File Export:** Saves all generated cards into a file for auditing or brute-force testing.

---

🚀 2. Prerequisites & Installation

* **Python:** Version 3.6 or higher
* 
* **Dependencies:** `colorama` (automatically installed on the first run).

**Run Command:**

python WiFi.py

🎬 3. Step-by-Step Usage

 * Enter 3 Sample Cards (Must be the same length):

   [*] Enter 3 sample cards (same length):

Card 1 ➤ 123456

Card 2 ➤ 128999

Card 3 ➤ 120321

   > Note: If the cards do not match in character length, the script returns:

   > ❌ Cards must be of the same length!

   > 
 * Set the Generation Count:

   How many cards to generate? ➤ 1000

   Enter the desired number of vouchers to generate and save.


<img width="1080" height="2131" alt="451445264-c13c1461-6328-4978-9f09-eeab49691e70" src="https://github.com/user-attachments/assets/fb25e079-0bd4-4cf3-b034-d93282a09693" />






الثاني
### 🧠 4. Pattern Analysis Mechanism

The script inspects each character position across the sample cards to determine its rule:

| Pattern Type | Description |

| :--- | :--- |

| **`fixed`** | A static character present in the exact same position across all sample cards |

| **`rand_digit`** | A variable numeric digit (`0-9`) changing between cards |

| **`rand_lower`** | A variable lowercase letter (`a-z`) |

| **`rand_upper`** | A variable uppercase letter (`A-Z`) |

| **`rand_mix`** | A variable alphanumeric character (letters or numbers) 


After mapping the layout, the generator constructs new vouchers that strictly follow the same structural rules.

---

### 📥 5. Saving the Output

Once generation finishes, the script prompts to save the wordlist:


💾 Do you want to save these cards? (yes/no): yes

Enter filename (e.g., cards.txt): cards.txt

 * Selecting yes lets you specify a custom output filename (e.g., cards.txt).
 * The generated vouchers are written directly to that file for downstream testing.
✅ 6. Script Output




## 📄 Preparing 

`cards.txt`

Create a file named:

```
cards.txt
```

Add your entries, one per line:

```
123456
987654
112233
...
```

---

## 🕹️ Usage

```bash
node Red-Team-X.js
```

An interactive terminal flow guides you through:

- Ghost session attempts  

- Behavioral login analysis  

- Response fingerprinting  

- Silent verification  

- Full logging  

---

## 📁 Output Files

- `results.json` → Full logs  

- `success.txt` → Valid hits only  

- `cards.txt` → Input list  

---

## 👁️ Credits

🧠 **Coded by:** MrPYTHON  

☣️ **Crew:** Red Team X  

📡 Telegram: 
[mrpython](https://t.me/MrYE_4)  

🎥 YouTube: 
[mrpython](https://youtube.com/@mrpythonfpi?si=42MhrN6E7DwE5GyH)  

🚧 Instagram:
[mrpython](https://www.instagram.com/mrpythonfpi?igsi=ZnlyZGd6emJsMG03)
🌐 More Tools:
 [mrpython](https://mrpython3.carrd.co/)

---

## ⚠️ Legal Disclaimer

This tool is intended for educational and authorized security research only.  

The developer is not responsible for misuse.  

Use ethically. Respect the law. Stay sharp.

---

🟥 **Red-Team-X — When silence becomes a weapon…**  

Unleash the ghost. Study the system. Control the shadows.
```

