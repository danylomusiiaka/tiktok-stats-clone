import { View, Text } from "react-native";
import Headline from "../Headline";
import { useID } from "contexts/IdContext";
import { useEffect, useState } from "react";
import { searchQueriesInitial } from "sqlite/tables/searchTerms";
import { getRowById } from "sqlite/queries/crud";

export default function SearchTerms() {
  const [searchTerms, setSearchTerms] = useState(searchQueriesInitial);
  const { id } = useID();

  useEffect(() => {
    const fetchRowByID = async () => {
      const data = await getRowById("searchQueries", id) as Record<string, string>;
      const parsedData = {
        id: data.id,
        query_values: JSON.parse(data.query_values)
      };
      setSearchTerms(parsedData);
    };
    fetchRowByID();
  }, [id]);

  return (
    <>
      <Headline name="Поисковые запросы" />
      {searchTerms.query_values?.map((term, index) => (
        <View key={index} className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text>{term.name}</Text>
            <Text className="font-bold">{term.value}%</Text>
          </View>
          <View className="h-3 overflow-hidden rounded-sm bg-gray-200">
            <View className="h-full rounded-sm bg-blue-500" style={{ width: `${parseInt(term.value) || 0}%` }} />
          </View>
        </View>
      ))}
    </>
  );
}
