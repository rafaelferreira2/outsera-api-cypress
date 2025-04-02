## Sobre
Repositório de teste técnico Outsera


## Stacks utilizadas
- Javascript
- Cypress (14.2.0)
- NodeJs (v22.14.0)

## Execução via Github Actions

1. Realizar o fork do repositório
2. Acessar o workflow de execução em outsera-api-cypress/actions/workflows/main.yml
3. Clicar no botão 'Run workflow' e confirmar a execução com a branch main
4. Será apresentado na listagem abaixo o workflow em execução
5. Ao finalizar em caso de sucesso, apresentará o workflow com ícone verde
6. Acessar e selecionar qual a o navegador executado deseja visualizar o resultado dos testes
7. Selecionar o step 'Run E2E tests' para visualizar o relatório

 ![poster](./.github/actions.png)
   

## Execução local
1. Clonar o repositório, instalar as dependências via terminal na raiz do projeto
```
yarn install / npm install
```

2. Executar todos os testes em Headless, relatório gerado na pasta 'cypress/report'
```
yarn cypress run / npx cypress run 
```

3. Para acompanhar a execução dos testes via interface gráfica, execute o comando abaixo e selecione a suite desejada
```
yarn cypress open / npx cypress open 
```

