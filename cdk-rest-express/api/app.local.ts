import app from 'apps/app';

const port = 3001;

// https://github.com/wclr/ts-node-dev/issues/120
process.on('SIGTERM', (err: any) => {
  process.exit(1);
});

const main = async () => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
};

main();
