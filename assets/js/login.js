
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  
  // Verificar se o usuário já está logado
  if (localStorage.getItem('authenticated') === 'true') {
    window.location.href = 'index.html';    // Se estiver logado, vai pra página index.html (página principal)
  }
  
  // Processar tentativa de login
  loginForm.addEventListener('submit', (e) => {  // quando clicar no botão 'submit', faz o event (e)
    e.preventDefault();   // Previne o evento padrão do navegador
    
    const username = document.getElementById('username').value;  // Pega o valor de usuário digitado
    const password = document.getElementById('password').value;  // Pega o valor da senha digitada
    
    // Verificar credenciais
    if (username === 'luizpetry' && password === 'luizpetry123') {  
      // Se der Login bem-sucedido
      localStorage.setItem('authenticated', 'true');   // Armazena no LocalStorage do PC, que o usuário está autenticado
      localStorage.setItem('username', username);  // Salva o nome de usuário para ser utilizado, fazer aparecer em outras páginas
      window.location.href = 'index.html';  // Redireciona para a página de index.html
    } else {  // Se não: 
      // Mostra o erro
      errorMessage.textContent = 'Nome de usuário ou senha incorretos.';
      errorMessage.style.display = 'block';
      
      // Limpa o erro após 3 segundos
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
    }
  });
});
