// maximus.js - The Grand Orchestrator for Absurds Maximus
const { spawn } = require('child_process');

console.log("IT'S SHOWTIME: Absurds Maximus is alive!");

// --- Configuration ---
// Path to your ArnoldC compiler jar file
const ARNOLDC_COMPILER_PATH = './ArnoldC.jar'; 
// The name of the compiled Java class file
const ARNOLDC_CLASS_NAME = 'AbsurdsMaximus';

// --- Step 1: Compile the ArnoldC code ---
// We use java to run the ArnoldC compiler, which spits out a .class file.
console.log('GET TO THE CHOPPA! Compiling the ArnoldC engine...');
const compiler = spawn('java', ['-jar', ARNOLDC_COMPILER_PATH, ARNOLDC_CLASS_NAME + '.arnoldc']);

compiler.stderr.on('data', (data) => {
    console.error(`Compiler Error: ${data}`);
});

compiler.on('close', (code) => {
    if (code !== 0) {
        console.error(`HE'S DEAD JIM! Compilation failed with code ${code}.`);
        return;
    }
    console.log('I LIED. Compilation successful.');
    
    // --- Step 2: Run the compiled engine ---
    runEngine();
});

function runEngine() {
    console.log('GET READY FOR THE MAIN EVENT! Running the engine...');
    const engine = spawn('java', [ARNOLDC_CLASS_NAME]);

    // --- Communication with the Engine ---
    engine.stdout.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`[Engine]: ${message}`);

        // TODO: Here you would parse the engine's output.
        // If it asks for an evaluation, you would run the Brainfuck process.
    });

    engine.stderr.on('data', (data) => {
        console.error(`[Engine Error]: ${data}`);
    });

    engine.on('close', (code) => {
        console.log(`YOU HAVE BEEN TERMINATED. Engine process exited with code ${code}.`);
    });

    // --- Send an initial command to the engine ---
    // For now, we'll just let it run. In a real scenario, you'd send FEN strings or commands.
    // engine.stdin.write('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1\n');
}
