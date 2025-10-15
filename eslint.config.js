import hexadrop from '@hexadrop/eslint-config';

export default hexadrop({
	ignore: {
		files: './.gitignore',
		globs: ['./public/mockServiceWorker.js'],
	},
});
