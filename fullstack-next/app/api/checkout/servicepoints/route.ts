import joi from "joi";
import { apiHandler } from "_helpers/server/api";
import { getPostNordApiKey } from "_helpers/server/config";

const NUMBER_OF_SERVICE_POINTS = 5;

let apiKey: string | undefined;
getPostNordApiKey().then((key) => {
  apiKey = key;
});

module.exports = apiHandler({
  POST: servicePoints,
});

async function servicePoints(req: Request) {
  const body = await req.json();
  const { street, streetNumber, postalCode, city } = body;

  console.log("Service points request:", body);

  try {
    if (!apiKey) {
      throw new Error("Could not retrieve the PostNord API key");
    }

    const res = await fetch(
      `https://api2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?apikey=${apiKey}&returnType=json&countryCode=SE&agreementCountry=SE&city=${city}&postalCode=${postalCode}&streetName=${street}&streetNumber=${streetNumber}&numberOfServicePoints=${NUMBER_OF_SERVICE_POINTS}&srId=EPSG%3A4326&context=optionalservicepoint&responseFilter=public&typeId=24%2C25%2C54&located=all&whiteLabelName=false`,
      { headers: { Accept: "application/json" } }
    );

    const resJSON = await res.json();

    return resJSON.servicePointInformationResponse.servicePoints;
  } catch (err) {
    console.log("Could not retrieve the service points from PostNord");
    throw err;
  }
}

servicePoints.schema = joi.object({
  street: joi.string().required(),
  streetNumber: joi.string().required(),
  postalCode: joi.string().required(),
  city: joi.string().required(),
});
