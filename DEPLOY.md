PUBLICAÇÃO (DEPLOY) DO PROJETO karangos NO GITHUB PAGES
==============================================

1. Adicione a seguinte propriedade ao seu arquivo `package.json`:
```
homepage: "https://{username}.github.io/{repo}/karangos/build/",
```
Troque `{username}` pelo seu usuário do GitHub e `{repo}` pelo nome do repositório. O meu ficou assim:
```
"homepage": "https://fcintra4.github.io/karangos-not-2021-1/karangos/build/",`
```

2. Execute no terminal (**apenas uma vez**): 
```
git branch gh-pages  # Cria o branch gh-pages
```

3. Executar a sequência de comandos no terminal, toda vez que quiser atualizar:
```
cd karangos
git checkout gh-pages
npm run build   # Gera os arquivos de produção em build/
cd build
git add -f .
git commit -m "Mensagem de commit"
git push origin gh-pages
git checkout master
```

4. Acesse o seu repositório do GitHub, vá em `Settings > Pages` e confira se o branch selecionado é `gh-pages` e se a pasta selecionada é `/ (root)`. **Isso precisa ser feito apenas uma vez**.

4. Acesse a URL que você colocou no parâmetro `homepage` do seu `package.json` e veja o resultado. Pode demorar alguns minutos para que atualizações passem a valer.
