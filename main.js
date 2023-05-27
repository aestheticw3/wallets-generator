import { ethers } from "ethers";
import { writeFileSync } from "node:fs";
import papa from "papaparse";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("How many wallets do you want to create? ", count => {
	console.log("Creating...");
	generateWallets(count);
	saveWalletsToCsvTable();
	saveWalletsToTxtFiles();
	console.log(`Success! ${count} wallets are ready to use.`);
	console.log("You can find them in the corresponding files.");
	rl.close();
});

const wallets = [];

const generateWallets = count => {
	for (let i = 0; i < count; i++) {
		const wallet = ethers.Wallet.createRandom();
		wallets.push(wallet);
	}
};

const saveWalletsToCsvTable = () => {
	const walletsCsvTableData = papa.unparse(
		wallets.map(wallet => ({
			address: wallet.address,
			"private-key": wallet.privateKey,
			mnemonic: wallet.mnemonic.phrase,
		}))
	);

	writeFileSync("wallets.csv", walletsCsvTableData);
};

const saveWalletsToTxtFiles = () => {
	writeFileSync(
		"addresses.txt",
		wallets.map(wallet => wallet.address).join("\n")
	);

	writeFileSync(
		"private-keys.txt",
		wallets.map(wallet => wallet.privateKey).join("\n")
	);

	writeFileSync(
		"mnemonics.txt",
		wallets.map(wallet => wallet.mnemonic.phrase).join("\n")
	);
};
