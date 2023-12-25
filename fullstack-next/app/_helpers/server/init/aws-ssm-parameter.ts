import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"; // ES Modules import
import log from "_utilities/log";

const config = { region: "eu-north-1" };

// Only one parameter can be retrieved at a time with this function
export async function parameterRetrieve(name: string) {
  const client = new SSMClient(config);
  const input = {
    Names: [name],
    WithDecryption: false,
  };

  const command = new GetParametersCommand(input);

  try {
    const response = await client.send(command);

    if (response.Parameters === undefined) {
      throw new Error("No parameters found in response from AWS");
    }

    if (response.Parameters[0].Value === undefined) {
      throw new Error("No parameter value with that name was found");
    }

    log("Successfully retrieved the parameter from AWS SSM");

    return response.Parameters[0].Value;
  } catch (err) {
    log("Error: " + err);
  }
}

// { // GetParametersResult
//   Parameters: [ // ParameterList
//     { // Parameter
//       Name: "STRING_VALUE",
//       Type: "String" || "StringList" || "SecureString",
//       Value: "STRING_VALUE",
//       Version: Number("long"),
//       Selector: "STRING_VALUE",
//       SourceResult: "STRING_VALUE",
//       LastModifiedDate: new Date("TIMESTAMP"),
//       ARN: "STRING_VALUE",
//       DataType: "STRING_VALUE",
//     },
//   ],
//   InvalidParameters: [ // ParameterNameList
//     "STRING_VALUE",
//   ],
// };
