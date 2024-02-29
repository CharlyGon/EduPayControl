
function closeWindow() {
    window.close();
}

function previewPhoto(input) {
    if (input?.files?.[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('photoPreview').style.display = 'block';
            document.getElementById('photoPreview').src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]); // Lee el contenido del archivo como una URL
    }
}

document.getElementById('photo').addEventListener('change', function () {
    previewPhoto(this);
});
