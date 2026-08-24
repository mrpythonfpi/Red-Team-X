import random
import time
import os
import sys

try:
    from colorama import Fore, Style, init
except ImportError:
    os.system("pip install colorama")
    from colorama import Fore, Style, init
    
    
from rich.console import Console
import time
import os

console = Console()

# النص الذي ترغب في طباعته بلون أصفر فاتح
fpi = f'''
              ⢀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⣴⣴⣾⣾⣾⣿⣿⣾⣿⣾⣿⣷⣷⣷⣷⣦⣦⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⢿⢛⢏⢟⢟⣿⣿⣿⣿⣿⣿⣿⣿⡿⡟⡟⢝⢟⢿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢼⣿⣏⣔⣴⣰⢄⢌⠘⠽⣿⣿⣿⣿⡿⠏⢃⢡⣠⣢⣢⣌⣻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣮⡢⣮⣿⣿⣿⣮⢪⣾⣾⣿⣿⣿⣿⣿⣿⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⢿⣟⠽⠊⠊⠊⠫⢻⣾⣿⣿⣿⣷⠻⠙⠘⠘⠚⢽⢿⣿⣿⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣵⣷⣽⣪⣞⣮⣮⣾⣿⣾⣿⣯⣿⣷⣵⣲⣲⣳⣵⣷⣷⣻⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢗⣿⣿⣿⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢽⣿⣿⣿⣿⣿⣿⢟⣿⣽⣟⣿⣿⣿⢾⣾⢿⡻⣿⣿⣿⣿⣿⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣷⣕⢭⠹⣾⣾⣿⣿⣏⡻⡽⣟⡟⣏⣿⣿⣿⣾⡾⠍⣕⢧⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⣝⢦⡈⠟⠟⠟⠏⠁⣠⣦⡀⠈⠛⠟⠟⠟⢀⡾⣣⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣎⢷⣷⣶⣵⣮⣦⣫⣫⣫⣦⣵⣶⣵⣾⢾⣱⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣯⣷⣿⣿⣿⣿⡛⠛⣻⣿⣿⣿⣿⣟⣵⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⢿⣷⣿⣿⣿⣿⡏⠀⢻⣿⣿⣿⣿⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⡅⠀⣸⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣧⢀⣾⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀      ☠⠀MrPYTHON⠀️☠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Telegram : @mrpythonfpi
Hi pro🙋

#------
[*] Telegram : MrPYTHON🎩✔\👿
[*] Telegram : @mrpythonfpi\🔝
[+]Telegram https://beacons.ai/mrpython\🌍
'''

B = "                            by: MrPYTHON\n                         Telegram :@mrpythonfpi \n"

# طباعة النص باللون الأصفر
for char in B:
    if char.isalpha():
        console.print(char, end='', style="bold yellow")  # اللون الأصفر الفاتح
    else:
        console.print(char, end='')
    time.sleep(0.04)

os.system('clear')

# طباعة القناع بلون أصفر فاتح
for char in fpi:
    console.print(char, end='', style="bold yellow")  # اللون الأصفر الفاتح
    time.sleep(0.001)
    

def supports_ansi():
    if os.name == 'nt':
        import ctypes
        kernel32 = ctypes.windll.kernel32
        handle = kernel32.GetStdHandle(-11)
        mode = ctypes.c_uint32()
        if kernel32.GetConsoleMode(handle, ctypes.byref(mode)):
            mode = mode.value | 0x0004
            return kernel32.SetConsoleMode(handle, mode)
        return False
    return sys.stdout.isatty()

supports_color = supports_ansi()
init(autoreset=True, strip=not supports_color)

def slowtype(text, delay=0.05, color=Fore.WHITE):
    for char in text:
        print(color + char, end='', flush=True)
        time.sleep(delay)
    print()

def glitch_line(char="▒", color=Fore.RED):
    text = "███" + char * 50
    if supports_color:
        print(color + text + Style.RESET_ALL)
    else:
        print(text)

def glitch_screen():
    for _ in range(5):
        glitch_line(char=random.choice("▒░▓"), color=random.choice([
            Fore.RED, Fore.LIGHTRED_EX, Fore.MAGENTA, Fore.LIGHTBLACK_EX
        ]))
        time.sleep(0.1)

def banner():
    os.system("cls" if os.name == "nt" else "clear")
    print(Fore.GREEN + Style.BRIGHT + r"""
  ██████╗  █████╗ ██████╗ ██████╗     ██████╗ ███████╗███╗░░██╗
 ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗   ██╔════╝ ██╔════╝████╗░██║
 ╚█████╗░ ███████║██║░░██║██████╔╝   ╚█████╗░ █████╗░░██╔██╗██║
 ░╚═══██╗ ██╔══██║██║░░██║██╔═══╝░   ░╚═══██╗ ██╔══╝░░██║╚████║
 ██████╔╝ ██║░░██║██████╔╝██║░░░░░   ██████╔╝ ███████╗██║░╚███║
 ╚═════╝░ ╚═╝░░╚═╝╚═════╝ ╚═╝░░░░░   ╚═════╝░ ╚══════╝╚═╝░░╚══╝""" +
Fore.LIGHTBLACK_EX + Style.BRIGHT + """
         🕶️  SYSTEM INITIATED — ANON PROTOCOL ACTIVE
          💀 You are being watched... Stay hidden.
""")
    glitch_screen()
    slowtype("👁️ You are being watched...", 0.03, Fore.LIGHTRED_EX)
    slowtype("🧠 Initializing Matrix Grid...", 0.03, Fore.LIGHTBLACK_EX)
    time.sleep(0.4)
    slowtype("Loading: [■■■■■■■■■■]", 0.03, Fore.RED)

def detect_pattern(cards):
    length = len(cards[0])
    pattern = []

    for i in range(length):
        chars = [card[i] for card in cards]
        if all(c == chars[0] for c in chars):
            pattern.append(('fixed', chars[0]))
        elif all(c.isdigit() for c in chars):
            pattern.append(('rand_digit',))
        elif all(c.islower() for c in chars):
            pattern.append(('rand_lower',))
        elif all(c.isupper() for c in chars):
            pattern.append(('rand_upper',))
        else:
            pattern.append(('rand_mix',))
    return pattern

def generate_from_pattern(pattern):
    result = ""
    for p in pattern:
        if p[0] == 'fixed':
            result += p[1]
        elif p[0] == 'rand_digit':
            result += str(random.randint(0, 9))
        elif p[0] == 'rand_lower':
            result += random.choice('abcdefghijklmnopqrstuvwxyz')
        elif p[0] == 'rand_upper':
            result += random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        elif p[0] == 'rand_mix':
            result += random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    return result

def main():
    banner()
    slowtype("\n[*] Enter 3 sample cards (same length):", 0.05, Fore.CYAN)

    cards = []
    for i in range(3):
        card = input(Fore.YELLOW + f"Card {i+1} ➤ ").strip()
        cards.append(card)

    if not all(len(card) == len(cards[0]) for card in cards):
        slowtype("❌ Cards must be of the same length!", 0.06, Fore.RED)
        return

    try:
        amount = int(input(Fore.CYAN + "\n[#] How many cards to generate? ➤ "))
    except ValueError:
        slowtype("❌ Invalid number.", 0.06, Fore.RED)
        return

    slowtype("\n⏳ Analyzing pattern...", 0.05, Fore.LIGHTMAGENTA_EX)
    time.sleep(1.2)

    pattern = detect_pattern(cards)
    generated_cards = [generate_from_pattern(pattern) for _ in range(amount)]

    print(Fore.GREEN + "\n⚡ Generated Cards:")
    print(Fore.LIGHTBLACK_EX + "-" * 30)
    for card in generated_cards:
        print(Fore.GREEN + "🔐 " + card)
    print(Fore.LIGHTBLACK_EX + "-" * 30)

    save = input(Fore.CYAN + "\n💾 Do you want to save these cards? (yes/no): ").strip().lower()
    if save in ['yes', 'y']:
        filename = input(Fore.YELLOW + "📂 Enter filename to save: ").strip()
        try:
            with open(filename, 'w') as f:
                for card in generated_cards:
                    f.write(card + '\n')
            slowtype(f"✅ Saved to '{filename}' successfully!", 0.05, Fore.GREEN)
        except Exception as e:
            slowtype(f"❌ Error saving file: {e}", 0.05, Fore.RED)

    slowtype("\n🎭 Hack The System... Stay Anonymous.", 0.07, Fore.LIGHTBLUE_EX)

if __name__ == "__main__":
    main()
