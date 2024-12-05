import fs from 'fs'
import Order from '../models/order.model.js';
import path from 'path';

export const insertData = async () => {

    const data = JSON.parse(fs.readFileSync(path.resolve("./src/models/data.json"), 'utf8'));

    try {
        const result = await Order.insertMany(data);
        console.log('Data Inserted from File:', result);

        res.json('Data Inserted');
    } catch (err) {
        console.error('Error inserting data from file:', err);
    }
}

export const runQueries = async (req, res) => {
    try {
        const allDocuments = await Order.find();
        console.log('All Documents:', allDocuments);

        const limitedDocuments = await Order.find().skip(3).limit(5);
        console.log('Limited Documents:', limitedDocuments);

        const paidOrders = await Order.find({ paid: 'Y' });
        console.log('Paid Orders:', paidOrders);

        const paid2019Orders = await Order.find({ paid: 'Y', year: 2019 });
        console.log('Paid Orders in 2019:', paid2019Orders);

        const unpaidOrBefore2019 = await Order.find({ $or: [{ paid: 'N' }, { year: { $lt: 2019 } }] });
        console.log('Unpaid or Orders Before 2019:', unpaidOrBefore2019);

        const nokOrders = await Order.find({ 'cost.currency': 'NOK' });
        console.log('Orders with NOK Currency:', nokOrders);

        const price18NOK = await Order.find({ 'cost.price': 18, 'cost.currency': 'NOK' });
        console.log('Orders with 18 NOK Price:', price18NOK);

        await Order.updateMany(
            { 'items.product': 'p2' },
            { $inc: { 'cost.price': 7 } }
        );
        console.log('Updated Documents with Product "p2"');

        await Order.deleteMany({ 'items.quantity': 4 });
        console.log('Deleted Documents with Product Quantity 4');

        const firstColorBlue = await Order.find({ 'items.0.colors.0': 'blue' });
        console.log('Documents with First Color Blue:', firstColorBlue);

        res.json('Data Retrieved');

    } catch (err) {
        console.error('Error:', err);
    }
}