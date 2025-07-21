document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Você pode adicionar mais interatividade aqui, se necessário.
    // Ex: um modal para o trailer, animações ao scroll.
    console.log("Landing page de 'A Sociedade dos Poetas Mortos' carregada!");
    console.log("Carpe Diem!");
});