// Example JSON responses for documentation
export const EXAMPLE_JSON_SUCCESS = `{
  "exists": true,
  "word": "học sinh",
  "results": [{
    "lang_code": "vi",
    "lang_name": "Tiếng Việt",
    "audio": "/api/dictionary/tts?word=h%E1%BB%8Dc%20sinh&lang=vi",
    "meanings": [
      {
        "definition": "người học ở bậc phổ thông",
        "definition_lang": "vi",
        "example": "học sinh tiểu học ~ thời học sinh",
        "pos": "Danh từ",
        "sub_pos": "Danh từ chỉ vật, hiện tượng",
        "source": "Tiếng Việt Thông Dụng",
        "links": []
      },
      {
        "definition": "Trẻ em học tập ở nhà trường.",
        "definition_lang": "vi",
        "example": "Học sinh trung học.",
        "pos": "Danh từ",
        "source": "Wiktionary",
        "links": []
      },
      {
        "definition": "a student",
        "definition_lang": "en",
        "pos": "Danh từ",
        "source": "Wiktionary EN",
        "links": []
      }
    ],
    "pronunciations": [
      { "ipa": "[hawk͡p̚˧˨ʔ sïŋ˧˧]", "region": "Hà-Nội" },
      { "ipa": "[hawk͡p̚˨˩ʔ sɨn˧˧]", "region": "Huế" },
      { "ipa": "[hawk͡p̚˨˩˨ sɨn˧˧]", "region": "Saigon" }
    ],
    "translations": [
      { "lang_code": "en", "translation": "student", "lang_name": "Tiếng Anh" },
      { "lang_code": "en", "translation": "pupil", "lang_name": "Tiếng Anh" },
      { "lang_code": "zh", "translation": "學生", "lang_name": "Tiếng Trung Quốc" }
    ],
    "relations": [
      { "related_word": "học viên", "relation_type": "Đồng nghĩa" },
      { "related_word": "sinh viên", "relation_type": "Đồng nghĩa" }
    ]
  }]
}`;

export const EXAMPLE_JSON_NOT_FOUND = `{
  "exists": false
}`;

// Code examples for API documentation - updated to match actual API structure
export const JS_CODE = `const word = "học sinh";
const url = \`https://dict.minhqnd.com/api/dictionary/lookup?word=\${encodeURIComponent(word)}\`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.exists) {
      console.log(\`Từ: \${data.word}\`);
      data.results.forEach(lang => {
        console.log(\`\\n[\${lang.lang_name}]\`);
        lang.meanings.forEach((m, i) => {
          console.log(\`  \${i + 1}. [\${m.pos}] \${m.definition}\`);
          if (m.example) console.log(\`     Ví dụ: \${m.example}\`);
        });
        if (lang.pronunciations?.length) {
          console.log(\`  IPA: \${lang.pronunciations[0].ipa} (\${lang.pronunciations[0].region})\`);
        }
      });
    }
  });`;

export const PYTHON_CODE = `import requests
from urllib.parse import quote

word = "học sinh"
url = f"https://dict.minhqnd.com/api/dictionary/lookup?word={quote(word)}"

data = requests.get(url).json()

if data["exists"]:
    print(f"Từ: {data['word']}")
    for lang in data["results"]:
        print(f"\\n[{lang['lang_name']}]")
        for i, m in enumerate(lang["meanings"], 1):
            print(f"  {i}. [{m['pos']}] {m['definition']}")
            if m.get("example"):
                print(f"     Ví dụ: {m['example']}")
        if lang.get("pronunciations"):
            p = lang["pronunciations"][0]
            print(f"  IPA: {p['ipa']} ({p['region']})")`;

export const CURL_CODE = `curl "https://dict.minhqnd.com/api/dictionary/lookup?word=h%E1%BB%8Dc%20sinh"`;

export const GO_CODE = `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
)

type Response struct {
    Exists  bool   \`json:"exists"\`
    Word    string \`json:"word"\`
    Results []struct {
        LangName string \`json:"lang_name"\`
        Meanings []struct {
            Pos        string \`json:"pos"\`
            Definition string \`json:"definition"\`
            Example    string \`json:"example"\`
        } \`json:"meanings"\`
        Pronunciations []struct {
            IPA    string \`json:"ipa"\`
            Region string \`json:"region"\`
        } \`json:"pronunciations"\`
    } \`json:"results"\`
}

func main() {
    word := "học sinh"
    apiURL := "https://dict.minhqnd.com/api/dictionary/lookup?word=" + url.QueryEscape(word)
    
    resp, _ := http.Get(apiURL)
    defer resp.Body.Close()
    
    var data Response
    json.NewDecoder(resp.Body).Decode(&data)
    
    if data.Exists {
        fmt.Printf("Từ: %s\\n", data.Word)
        for _, lang := range data.Results {
            fmt.Printf("\\n[%s]\\n", lang.LangName)
            for i, m := range lang.Meanings {
                fmt.Printf("  %d. [%s] %s\\n", i+1, m.Pos, m.Definition)
            }
        }
    }
}`;

export const JAVA_CODE = `import java.net.*;
import java.io.*;
import org.json.*;

public class Dictionary {
    public static void main(String[] args) throws Exception {
        String word = "học sinh";
        String url = "https://dict.minhqnd.com/api/dictionary/lookup?word=" 
            + URLEncoder.encode(word, "UTF-8");
        
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(conn.getInputStream(), "UTF-8"));
        
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) response.append(line);
        
        JSONObject data = new JSONObject(response.toString());
        if (data.getBoolean("exists")) {
            System.out.println("Từ: " + data.getString("word"));
            JSONArray results = data.getJSONArray("results");
            for (int i = 0; i < results.length(); i++) {
                JSONObject lang = results.getJSONObject(i);
                System.out.println("\\n[" + lang.getString("lang_name") + "]");
                JSONArray meanings = lang.getJSONArray("meanings");
                for (int j = 0; j < meanings.length(); j++) {
                    JSONObject m = meanings.getJSONObject(j);
                    System.out.printf("  %d. [%s] %s%n", j+1, m.getString("pos"), m.getString("definition"));
                }
            }
        }
    }
}`;

export const C_CODE = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

int main() {
    CURL *curl = curl_easy_init();
    if (curl) {
        char *word = curl_easy_escape(curl, "học sinh", 0);
        char url[256];
        snprintf(url, sizeof(url), 
            "https://dict.minhqnd.com/api/dictionary/lookup?word=%s", word);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_perform(curl);
        
        curl_free(word);
        curl_easy_cleanup(curl);
    }
    return 0;
}`;

export const CODES: Record<string, string> = {
    js: JS_CODE,
    python: PYTHON_CODE,
    go: GO_CODE,
    java: JAVA_CODE,
    c: C_CODE,
    curl: CURL_CODE
};
