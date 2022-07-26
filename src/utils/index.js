export const cleanCopiedCode = code => {
    const confirmMessage = 'Do you really want ot leave?';

    let newText = code.replace(/(<style[\w\W]+style>)/g, "")
        .replace(/(<script[\w\W]+script>)|(<iframe[\w\W]+iframe>)|(onclick="[^"]+")|(onclick='[^"]+')|(style="[^"]*")|(style='[^"]*')/g, "")

    return (/^(?!confirm$).*/gi.test(newText)) ? newText.replace(/href/g, `onclick="return confirm('${confirmMessage}')" href`) : newText
}