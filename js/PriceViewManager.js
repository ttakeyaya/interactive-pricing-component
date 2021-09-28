class PriceViewManager{
  constructor(maxPrice, maxPageViews, discountRate = 0.25){
    this._maxPrice = maxPrice;
    this._maxPageViews = maxPageViews;
    this._discountRate = discountRate;
    
    this.currentPrice = 0;
    this.currentPageView = 0;
    this.currentPriceYear = 0;
    this.currentPageViewYear = 0;

    this._currentPercentage = 0;
  }
  get currentPercentage(){
    return this._currentPercentage;
  }

  findMonthlyPriceViews(percentage){
    if(percentage < 0 || percentage > 100) throw new Error("percentage should be between 0 and 100");
    this._currentPercentage = percentage;
    this.currentPrice = (this._maxPrice/100)*this._currentPercentage;
    this.currentPageView = (this._maxPageViews/100)*this._currentPercentage;
    
    return [
      this.currentPrice, 
      this.currentPageView
    ];
  }
  
  findYearlyPriceViews(percentage){
    if(percentage < 0 || percentage > 100) throw new Error("percentage should be between 0 and 100");
    this._currentPercentage = percentage;
    this.currentPriceYear = (this._maxPrice/100)*this._currentPercentage*12*(1 - this._discountRate);
    this.currentPageViewYear = (this._maxPageViews/100)*this._currentPercentage*12;

    return[
      this.currentPriceYear,
      this.currentPageViewYear
    ]
  }
}

export default PriceViewManager;