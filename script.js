async function consultar() {
    const input = document.getElementById('nomeUser');
    const div = document.getElementById('imgUser');
    const username = input.value.trim();

    //Verifica se o input está vazio.
    if (!username) {
        div.innerHTML = '<p>Informe um nome de usuário.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        //Retorna quando nome digitado não for encontrado.
        if (!response.ok) {
            div.innerHTML = '<p>Usuário não encontrado.</p>';
            return;
        }
        const data = await response.json();

        //Mostra a imagem de perfil do nome digitado.
        div.innerHTML = `<a><img 
                    src="${data.avatar_url}" 
                    alt="Foto de perfil de ${data.login}" 
                    width="370"
                    style="border-radius: 25px; box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);"></a>`;

        //Link para direcionar o usuário ao link do perfil que está sendo exibido.
        div.innerHTML += `<p><a href="${data.html_url}" target="_blank"
                    style="color:gray; text-decoration: none;">Acessar perfil GitHub</a></p>`;

    } catch (erro) {
        div.innerHTML = '<p>Erro ao consultar o GitHub.</p>';
        console.error(erro);
    }
}