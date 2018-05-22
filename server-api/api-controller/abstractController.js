
/**
 * Questo oggetto contiene dei metodi utili per tutti i controller
 * */


exports.retrun_request = (req, res, next, body) => {
    res.header('Content-Type', 'application/json');
    res.status(200);
    res.json(body);
};

exports.return_bad_request = (req, res, next, message = '', payload = {}) => {

    let errorMessage = 'Bad request, error 400';
    if (message !== '') {
        errorMessage += ' | ' + message
    }
    res.header('Content-Type', 'application/json');
    res.status(400);
    res.json({
        message: errorMessage,
        payload: payload
    });

};