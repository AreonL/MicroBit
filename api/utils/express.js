module.exports.useAsync = function useAsync (callback) {
  return function (req, res, next) {
    const result = callback(req, res, next)

    Promise.resolve(result)
      .then(() => next())
      .catch(next)
  }
}