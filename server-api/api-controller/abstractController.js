
/**
 * Questo oggetto contiene dei metodi utili per tutti i controller
 * */


exports.retrun_request = (req, res, next, body) => {
    res.header('Content-Type', 'application/json');
    res.status(200);
    res.json(body);
};

exports.reformat_errors = (errorsObject) => {

    console.log(errorsObject);

    for (let param in errorsObject) {
       delete errorsObject[param].location
    }

    console.log(errorsObject);

    return errorsObject
};

exports.return_bad_request = (req, res, next, payload = {}) => {

    let errorMessage = 'Bad request, error 400';
    res.header('Content-Type', 'application/json');
    res.status(400);
    res.json({
        message: errorMessage,
        payload: payload
    });

};