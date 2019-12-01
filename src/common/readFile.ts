// @ts-ignore
import * as fs from 'file-system';

const readFile = (number : number) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`./src/${number}/${number}.txt`, (err : string, data : string) => {
			if (err) {
				reject(err);
			} else {
				resolve(data.toString());
			}
		})
	});
}

export default readFile;