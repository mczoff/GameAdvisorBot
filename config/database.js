module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    mongoose.connect(config.database, {
        promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`Connection to GameAdvisor database failed: ${error}`));
    database.on('connected', () => console.log('Connected to GameAdvisor database'));
    database.on('disconnected', () => console.log('Disconnected from GameAdvisor database'));
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('GameAdvisor terminated, connection closed');
            process.exit(0);
        })
    });
};