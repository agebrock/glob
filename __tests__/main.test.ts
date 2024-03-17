import { glob } from '../src/main.js';


describe('Sample Test', () => {

    beforeAll(async () => {

    });

    beforeEach(async () => {

    });

    afterAll(() => {

    });


    it('should return Hallo', () => {
        const files:string[] = []
      const g = glob('**/*.json',{});
      g.on('data', (data) => {
        console.log(data);
        files.push(data);
      });
      expect(files).toContain('file.json');
    });

});
