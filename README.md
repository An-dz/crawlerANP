# Crawler de preços da ANP

Se você está fazendo probabilidade e estatística na UFSC com o Fletes ele
provavelmente pediu para pegar os preços de algum combustível no site da ANP.

Este crawler vai fazer o trabalho para você, criando uma tabela HTML que você
pode copiar e colar em um Excel qualquer.

## Como baixar

O GitHub oferece um botão em algum lugar para baixar um zip, no design quando
fiz este upload o botão se chama `Code`, ele abre um menu onde a opção para
baixar um zip deve aparecer.

## Como instalar

Se está usando um browser baseado no Chromium:
- Abra a página `chrome://extensions`
- No canto superior direito habilite a opção **Modo de Desenvolvedor**
- Clique em **Carregar Extensão** e selecione a pasta deste projeto

Se está usando um browser baseado no Firefox/Gecko:
- Abra a página `about:debugging`
- No menu da esquerda escolha a segunda opção **Este Browser**
- Clique em **Carregar Add-on Temporário** e selecione a pasta deste projeto

## Como usar

Abra o site de preços da ANP, selecione o estado e o combustível e passe o
captcha. Assim que a página listando os municípios abrir o script já irá
começar a funcionar. Você saberá que ele funciona porque a página ficará
trocando. Assim que o script terminar ele vai pedir para salvar o arquivo
gerado em algum lugar. Agora só abra este arquivo, dê um `Ctrl+A` e cole no
Excel.

### Pegar apenas cidades que começam com uma letra

Para alguns estados o Fletes pede que se pegue apenas cidades que começam com
uma letra. Se você tem essa restrição vá nas linhas 38-41, remova a linha 39,
remova as `//` da linha 41 e troque o `DEF` desta linha 41 pelas letras que
você precisa.
