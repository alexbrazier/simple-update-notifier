import https from 'https';

const getDistVersion = async (packageName: string, distTag: string) => {
  const url = `https://registry.npmjs.org/-/package/${packageName}/dist-tags`;

  return new Promise<string>((resolve, reject) => {
    https
      .get(url, async (res) => {
        let body = '';
        for await (const chunk of res) body += chunk;
        const json = JSON.parse(body);
        const version = json[distTag].split('-')[0];

        resolve(version);
      })
      .on('error', (err) => reject(err));
  });
};

export default getDistVersion;
