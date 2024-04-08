package com.cruds.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.cruds.controllers.advisorController;

public class TestadvisorController {
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Advisor = require('../models/advisorModel');
const Plan = require('../models/plansModel');
const Client = require('../models/clientModel');
const Transaction = require('../models/transactionModel');

const request = supertest(app);

describe('Advisor Controller', () => {
    let advisorId;
    let planId;

    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect(process.env.MONGODB_TEST_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await mongoose.connection.close();
    });

    it('should register a new advisor', async () => {
        const res = await request.post('/api/v1/advisor/register').send({
            name: 'Test Advisor',
            email: 'test@example.com',
            // Add other required fields
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.advisor).toBeDefined();
        advisorId = res.body.data.advisor._id;
    });

    it('should add a new plan for the advisor', async () => {
        const res = await request.post('/api/v1/advisor/addPlan').send({
            // Add plan details
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.plan).toBeDefined();
        planId = res.body.data.plan._id;
    });

    it('should fetch list of plans for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/listOfPlans');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.plans).toBeDefined();
    });

    it('should fetch top plans for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/topPlans');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.plans).toBeDefined();
    });

    it('should fetch list of clients for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/listOfClients');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.clients).toBeDefined();
    });

    it('should fetch advisor details', async () => {
        const res = await request.get('/api/v1/advisor/getOwndetails');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.advisor).toBeDefined();
    });

    it('should fetch transactions for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/getTransactions');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.transactions).toBeDefined();
    });

    it('should fetch number of clients for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/getNoOfClients');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.noOfClients).toBeDefined();
    });

    it('should fetch total cumulative invested amounts for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/totalCummulativeInvestedAmounts');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.totalInvestedAmount).toBeDefined();
    });

    it('should fetch cumulative current profit for the advisor', async () => {
        const res = await request.get('/api/v1/advisor/cummulativeCurrentProfit');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.totalCumulativeReturn).toBeDefined();
        expect(res.body.totalCumulativeProfit).toBeDefined();
    });

    it('should delete a plan for the advisor', async () => {
        const res = await request.delete(`/api/v1/advisor/deletePlan/${planId}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.message).toBe('Plan Deleted !!! :)');
        expect(res.body.plan).toBeDefined();
    });
});

}
