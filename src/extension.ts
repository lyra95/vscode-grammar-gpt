// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as openai from 'openai';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('grammar-gpt.OpenAI');
	const apiKey= config.get('APIKey') as string;
	const openaiApi = new openai.OpenAIApi(new openai.Configuration({apiKey: apiKey}));
	// todo: apiKey가 맞는지 확인하고 실패하면 우 아래에 팝업 뜨게 하기
	
	let disposable = vscode.commands.registerTextEditorCommand('grammar-gpt.fix', async (textEditor, _) => {
		let selectionToFix = textEditor.selection;
		let textToFix = textEditor.document.getText(new vscode.Range(selectionToFix.start, selectionToFix.end));

		try {
			let response = await openaiApi.createCompletion({
				model: "text-davinci-003",
				prompt: `$Please fix any typos or grammar issues in the following text. You must not tell me other than the fixed text.:\n${textToFix}`,
				max_tokens: 2048,
			});

			// https://github.com/microsoft/vscode/issues/178931 must use editBuilder after await
			textEditor.edit((editBuilder) => {
				var textFromOpenAI = response.data.choices[0].text;
				if (textFromOpenAI === undefined) {
					throw new Error("got undefined from OpenAI");
				}
				textFromOpenAI = textFromOpenAI.trim();
				editBuilder.replace(selectionToFix, textFromOpenAI);
			});
		} catch (error) {
			// todo: 우 아래에 에러메세지 팝업 뜨게 하기
			console.log("request to openai failed");
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
