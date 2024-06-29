document.getElementById('cryptoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const text = document.getElementById('text').value;
    const method = document.getElementById('method').value;
    let resultText = '';

    if (method === 'EncryptROT13') {
        resultText = rot13(text);
        document.getElementById('resultHeader').innerText = 'Hasil Enkripsi (Ciphertext):';
    } else if (method === 'EncryptROT128') {
        resultText = rot128(text);
        document.getElementById('resultHeader').innerText = 'Hasil Enkripsi (Ciphertext):';
    } else if (method === 'DecryptROT13') {
        resultText = rot13(text);
        document.getElementById('resultHeader').innerText = 'Hasil Dekripsi (Plaintext):';
    } else if (method === 'DecryptROT128') {
        resultText = decryptRot128(text);
        document.getElementById('resultHeader').innerText = 'Hasil Dekripsi (Plaintext):';
    }

    document.getElementById('resultText').innerText = resultText;
    document.getElementById('resultContainer').style.display = 'block';
});

function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
            c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
        );
    });
}

function rot128(text) {
    return String.fromCharCode(...[...text].map(c => (c.charCodeAt(0) + 128) % 256));
}

function decryptRot128(text) {
    return String.fromCharCode(...[...text].map(c => (c.charCodeAt(0) - 128 + 256) % 256));
}

function copyToClipboard() {
    const copyText = document.getElementById("resultText").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Teks berhasil disalin!");
    }, (err) => {
        alert("Gagal menyalin teks: ", err);
    });
}
