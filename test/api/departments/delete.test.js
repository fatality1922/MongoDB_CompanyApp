const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/departments.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Delete /api/departments', () => {

    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    });

    after(async () => {
        await Department.deleteMany();
    });  

    it('/ should delete one document of db', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        const dep = await Department.findOne({ name: '#Department #1' });
        // expect(res.status).to.be.equal(200);
        // expect(res.body.message).to.be.equal('OK');
        expect(dep).to.be.null;
    });

});