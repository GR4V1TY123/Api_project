import useMovieFetch from "@/hooks/useMovieFetch";
import { JsonEditor, githubDarkTheme } from "json-edit-react";
import { useSearchParams } from "react-router-dom";

export default function ApiInfo({apiResponse, fullJson, title}: any) {

  // const [searchParams] = useSearchParams();
  // const title = searchParams.get("title");
  // const { apiResponse, fullJson } = useMovieFetch();

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      <p className="text-sm"><span className="font-medium text-gray-600">Query:</span> {title}</p>
      <p className="text-sm"><span className="font-medium text-gray-600">Status Code:</span> {apiResponse.statusCode}</p>
      {/* <p className="text-sm"><span className="font-medium text-gray-600">Status Text:</span> {apiResponse.statusText}</p> */}
      <p className="text-sm"><span className="font-medium text-gray-600">Response Type:</span> {apiResponse.resType}</p>
      {/* <p className="text-sm"><span className="font-medium text-gray-600">Response Size:</span> {apiResponse.resSize}</p> */}
      <p className="text-sm"><span className="font-medium text-gray-600">Response Time (ms):</span> {apiResponse.resTime}</p>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Headers</p>
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(apiResponse.resHeaders, null, 2)}
        </pre>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">JSON Body</p>
        <div className="border rounded p-2 bg-gray-50">
          <JsonEditor data={fullJson} collapse={1} theme={githubDarkTheme} />
        </div>
      </div>
    </div>
  );
}
