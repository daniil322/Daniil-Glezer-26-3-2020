export interface RequestCountry {
    ID: string;
    LocalizedName: string;
}

export interface RequestAdministrativeArea {
    ID: string;
    LocalizedName: string;
}

export interface RequestAutoCompleteLocation {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: RequestCountry;
    AdministrativeArea: RequestAdministrativeArea;
}


export interface RequestTemperature {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface RequestTemperatureTypes {
    Metric: RequestTemperature;
    Imperial: RequestTemperature;
}

export interface RequestWeatherCondition {
    LocalObservationDateTime: Date;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: any;
    IsDayTime: boolean;
    Temperature: RequestTemperatureTypes;
    MobileLink: string;
    Link: string;
}


export interface RequestHeadline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: Date;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

export interface RequestTemperature {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface RequestTemperatureTypes {
    Minimum: RequestTemperature;
    Maximum: RequestTemperature;
}

export interface RequestDay {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

export interface RequestNight {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface RequestDailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: RequestTemperatureTypes;
    Day: RequestDay;
    Night: RequestNight;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface RequestWeather {
    Headline: RequestHeadline;
    DailyForecasts: RequestDailyForecast[];
}
