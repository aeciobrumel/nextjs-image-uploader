# nextjs-image-uploader

Projeto de upload de imagem com Next.js, com preview local, suporte a drag-and-drop e barra de progresso.

## Status atual

- Aplicacao implementada no diretorio `my-app`.
- Upload configurado para `https://httpbin.org/post` (endpoint de teste).
- Endpoint local de upload (`app/api/upload/route.ts`) ainda nao esta implementado no repositorio.

## Stack

- Next.js `16.1.6`
- React `19.2.3`
- TypeScript `5`
- Tailwind CSS `4`
- Axios
- react-dropzone

## Funcionalidades

- Selecionar imagem por input de arquivo.
- Selecionar imagem por drag-and-drop.
- Exibir preview da imagem antes do envio.
- Enviar legenda opcional junto com o arquivo.
- Exibir progresso de upload em tempo real.

## Estrutura principal

```text
my-app/
  app/
    components/
      form.tsx
    layout.tsx
    page.tsx
```

## Como executar

```bash
cd my-app
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Scripts

No diretorio `my-app`:

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera o build de producao.
- `npm run start`: inicia a aplicacao em modo producao.
- `npm run lint`: executa o lint com ESLint.
