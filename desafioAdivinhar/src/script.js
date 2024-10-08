/* Crie um jogo de adivinhação de números em JavaScript com as seguintes características:

O jogo deve sortear um número aleatório entre 1 e 100.

Solicite o nome do jogador no início do jogo.

Use prompt para pedir os palpites do jogador e alert para fornecer feedback.

O jogo deve informar se o palpite está alto, baixo ou correto.

Conte o número de tentativas que o jogador precisa para acertar.

Ao acertar, mostre uma mensagem de parabéns com o número de tentativas.

Mantenha um ranking dos 10 melhores jogadores (menos tentativas).

Exiba o ranking atualizado após cada jogo. 

*/

let arrayPartidas = [];

let jogo1 = { nome : 'João Gamer' , tentativas : 4 };
let jogo2 = { nome : 'Theo Tryhard' , tentativas : 7 };
let jogo3 = { nome : 'Felipe Teclados' , tentativas : 11 };

arrayPartidas.push( jogo1 );
arrayPartidas.push( jogo2 );
arrayPartidas.push( jogo3 );


const botaoNome = document.getElementById("botaoNome");
const nomeInput = document.getElementById("nome");
const numeroInput = document.getElementById("numero");
const botaoNumero = document.getElementById("botaoNumero");
const dica = document.getElementById("dica");
const mostrarDica = document.getElementById("divDica");
const dicaNome = document.getElementById( "dicaNome" );
const comecarDiv = document.getElementById( "comecar" );
const jogoDiv = document.getElementById( "jogo" );
const menu = document.getElementById( "menu" );
const placar = document.getElementById( "placar" );

let valorNome = '';
resetPlacar();

botaoNome.addEventListener("click", () => {
    
    valorNome = nomeInput.value; 
    console.log(valorNome);
    const regex = /^[a-zA-Z0-9]{3,}$/;
    
    if ( regex.test(valorNome) ) {
        
        menu.style.display = "none";
        jogoDiv.style.display = "flex";
        comecar();
        
    } else {
        dicaNome.style.display = "block";
    }
});

//localStorage.setItem('nome', 'João');

let comecar = () => {
    comecarDiv.style.display = "flex";
    botaoNumero.innerHTML = "Adivinhar!";
    botaoNumero.style.backgroundColor = "#aaaaaa";
    nomeInput.value = "";
    jogo(valorNome);
}

function menuInicial() {
    menu.style.display = "flex";
    jogoDiv.style.display = "none";
    dicaNome.style.display = "none";
}

function resetPlacar() {

    placar.innerHTML = "";

    arrayPartidas.forEach(element => {
            
        let para = document.createElement("li");
        para.className = "flex flex-row justify-between list-decimal first:text-yellow-500 [&:nth-child(2)]:text-stone-400 [&:nth-child(3)]:text-amber-800";
        let div1 = document.createElement( "div" );
        let div2 = document.createElement( "div" );
        let node1 = document.createTextNode( `Nome: ${element.nome}` );
        let node2 = document.createTextNode( `Tentativas: ${element.tentativas}` );
        para.appendChild(div1);
        para.appendChild(div2);
        div1.appendChild(node1);
        div2.appendChild(node2);
        placar.appendChild(para);
    
    })
}

function jogo(nome) {
    mostrarDica.style.display = "none";
    numeroInput.value = "";
    let contador = 0 , acertou = false;
    let sorteado = Math.floor(Math.random() * 100) + 1;
    
    console.log( sorteado );
    
    botaoNumero.addEventListener("click", jogoTestador);
    botaoNumero.removeEventListener("click", menuInicial);

    

    function jogoTestador() {

        let valor = parseInt(numeroInput.value); 
        
        if (isNaN(valor)) {

            dica.innerHTML = "Por favor, insira um número válido.";

        } else {
            contador++;
            if (valor > sorteado) {
                //colocar alguma coisa de "o numero ainda e maior"
                dica.innerHTML = "O número sorteado é menor que o inserido!";
                botaoNumero.style.backgroundColor = "#d93d3d"
            
            } else if (valor < sorteado) {
                dica.innerHTML = "O número sorteado é maior que o inserido!";
                botaoNumero.style.backgroundColor = "#d9763d"
            
            } else {
                botaoNumero.style.backgroundColor = "#7CFC00"
                dica.innerHTML = 'Você acertou!!!! Número de tentativas: ' + contador;
                acertou = true;
                botaoNumero.innerHTML = "Voltar";
            }          
            if ( acertou ) {

                let jogo = { nome : nome , tentativas : contador };
                arrayPartidas.push( jogo );
                console.log( jogo );
                arrayPartidas.sort((a,b) => a.tentativas - b.tentativas);
                arrayPartidas = arrayPartidas.slice(0 , 10);
                resetPlacar();

                arrayPartidas.forEach(element => {
                    console.log( element );
                });
                
                botaoNumero.removeEventListener("click", jogoTestador);
                botaoNumero.addEventListener("click", menuInicial);
            }

        }
        
        mostrarDica.style.display = "block";
        console.log("Tentativa " + contador);
        
    }
}
