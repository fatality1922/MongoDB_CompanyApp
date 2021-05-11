const Employee = require('../employees.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {
        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getConnectionString();
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'It', salary: 2137 });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Robert', lastName: 'Lewandowski', department: 'Geodezja', salary: 100 });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(2);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const employees = await Employee.findOne({ firstName: 'Robert' });
            expect(employees.firstName).to.be.equal('Robert');
            expect(employees.lastName).to.be.equal('Lewandowski');
            expect(employees.department).to.be.equal('Geodezja');
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const testEmpTwo = new Employee({ firstName: 'Robert', lastName: 'Lewandowski', department: 'Geodezja', salary: 100 });
            await testEmpTwo.save();
            expect(testEmpTwo.isNew).to.be.false;
        });


        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'It', salary: 2137 });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Robert', lastName: 'Lewandowski', department: 'Geodezja', salary: 100 });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Robert' }, { $set: { firstName: '=Department #1=', lastName: 'Testowski', department: 'Piekarnia' } });
            const updatedEmployee = await Employee.findOne({ firstName: '=Department #1=', lastName: 'Testowski', department: 'Piekarnia' });
            expect(updatedEmployee).to.not.be.null;
        });


        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            employee.firstName = '=Department #1=';
            await employee.save(); //???

            const updatedEmployee = await Employee.findOne({ name: '=Department #1=' });
            expect(updatedEmployee).to.not.be.null;
        });


        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
            const employee = await Employee.find();
            expect(employee[0].firstName).to.be.equal('Updated!');
            expect(employee[1].firstName).to.be.equal('Updated!');
        });

    });

    describe('Removing data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'It', salary: 2137 });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Robert', lastName: 'Lewandowski', department: 'Geodezja', salary: 100 });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });


        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Robert' });
            const removeEmployee = await Employee.findOne({ name: 'Robert' });
            expect(removeEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Robert' });
            await employee.remove();
            const removeEmployee = await Employee.findOne({ name: 'Robert' });
            expect(removeEmployee).to.be.null;
          });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany({});
            const removeEmployee = await Employee.find();
            expect(removeEmployee.length).to.be.equal(0);
        });

    });
});