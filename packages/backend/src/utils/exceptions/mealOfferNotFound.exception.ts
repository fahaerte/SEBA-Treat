import HttpException from "./http.exception";

class MealOfferNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Meal offer with id ${id} not found`);
    }
}

export default MealOfferNotFoundException;