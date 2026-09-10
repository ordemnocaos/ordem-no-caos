# Ordem no Caos — site de afiliados

Site estático feito em Jekyll, editável por um painel (Sveltia CMS) sem
precisar mexer em código no dia a dia. Hospedagem gratuita no GitHub Pages.

## O que já está pronto

- Página única com busca, filtro por categoria e lista de promoções
  (mais recente primeiro).
- Tema **claro por padrão**, com botão para o visitante trocar para escuro
  (a escolha fica salva no navegador dele).
- Painel em `/admin` com duas partes:
  - **Promoções**: cadastra produto por produto (nome, categoria, preços,
    link de afiliado, imagem, data) sem tocar em código.
  - **Textos do site**: frase do topo, aviso de afiliado e nota do rodapé.
- 3 produtos de exemplo já cadastrados em `_promocoes/`, só pra você ver
  como fica — pode apagar ou editar pelo painel depois.

## O que falta você me mandar

- Sua logo em PNG (fundo transparente, boa resolução) — eu gero os
  favicons e troco o emblema de rascunho que está no header.

## Passo a passo pra colocar no ar

### 1. Criar o repositório no GitHub (na conta nova/separada)

1. Entre na conta do GitHub que vai ser só para este canal.
2. Clique em **New repository**.
3. Nome sugerido: `ordem-no-caos-site`.
4. Marque como **Public** (necessário para o GitHub Pages gratuito, a
   menos que você tenha um plano pago).
5. Não marque "Add a README" (já temos um) — crie vazio.

### 2. Subir os arquivos

Duas formas, escolha a que for mais fácil pra você:

- **Pela interface do GitHub**: na página do repositório recém-criado,
  clique em "uploading an existing file" e arraste a pasta inteira
  (ou o zip descompactado).
- **Por linha de comando** (se preferir aprender):
  ```
  cd ordem-no-caos-site
  git init
  git add .
  git commit -m "primeira versão do site"
  git branch -M main
  git remote add origin https://github.com/SEU-USUARIO/ordem-no-caos-site.git
  git push -u origin main
  ```

### 3. Ativar o GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em "Source", escolha **Deploy from a branch**.
3. Branch: `main`, pasta: `/ (root)`.
4. Salve. Em alguns minutos o site estará em
   `https://SEU-USUARIO.github.io/ordem-no-caos-site/` (ou na raiz,
   `https://SEU-USUARIO.github.io/`, se o repositório se chamar
   exatamente `SEU-USUARIO.github.io`).
5. **Importante**: se o site ficar num subcaminho (não na raiz), me avise
   — preciso ajustar a linha `baseurl` do `_config.yml` pra combinar.

### 4. Editar `admin/config.yml`

Antes de subir (ou direto pela interface do GitHub, editando o arquivo),
troque esta linha:

```yaml
repo: SEU-USUARIO/ordem-no-caos-site
```

pelo nome real do seu usuário e repositório.

### 5. Criar o token de acesso para logar no painel `/admin`

1. Na conta do GitHub: **Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token**.
2. Dê um nome (ex: "Sveltia CMS Ordem no Caos").
3. Em "Repository access", escolha **Only select repositories** e marque
   o `ordem-no-caos-site`.
4. Em "Permissions", dê acesso de **Read and write** para "Contents".
5. Gere o token e **copie na hora** (ele não aparece de novo depois).
6. Acesse `https://SEU-SITE/admin`, cole o token quando pedido — pronto,
   você já cadastra promoções sem precisar de mim.

Qualquer passo que travar, me chama que eu explico de novo com mais
calma.
