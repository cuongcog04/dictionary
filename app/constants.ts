export const JS_CODE = `const word = "học sinh";
const url = \`https://minhqnd.com/api/dictionary/lookup?word=\${encodeURIComponent(word)}\`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.exists) {
      console.log(\`Từ: \${data.word}\`);
      data.meanings.forEach((m, i) => {
        console.log(\`\${i + 1}. [\${m.pos}] \${m.definition} (Nguồn: \${m.source})\`);
      });
    }
  });`;

export const PYTHON_CODE = `import requests
from urllib.parse import quote

word = "học sinh"
url = f"https://minhqnd.com/api/dictionary/lookup?word={quote(word)}"

response = requests.get(url)
data = response.json()

if data["exists"]:
    print(f"Từ: {data['word']}")
    for i, m in enumerate(data["meanings"], 1):
        print(f"{i}. [{m['pos']}] {m['definition']} (Nguồn: {m['source']})")`;

export const CURL_CODE = `curl "https://minhqnd.com/api/dictionary/lookup?word=h%E1%BB%8Dc%20sinh"`;

export const GO_CODE = `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
)

func main() {
    word := "học sinh"
    apiURL := "https://minhqnd.com/api/dictionary/lookup?word=" + url.QueryEscape(word)
    
    resp, _ := http.Get(apiURL)
    defer resp.Body.Close()
    
    var data map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&data)
    
    if data["exists"].(bool) {
        fmt.Printf("Từ: %s\\n", data["word"])
    }
}`;

export const JAVA_CODE = `import java.net.*;
import java.io.*;
import org.json.*;

public class Dictionary {
    public static void main(String[] args) throws Exception {
        String word = "học sinh";
        String url = "https://minhqnd.com/api/dictionary/lookup?word=" 
            + URLEncoder.encode(word, "UTF-8");
        
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(conn.getInputStream()));
        
        JSONObject data = new JSONObject(reader.readLine());
        if (data.getBoolean("exists")) {
            System.out.println("Từ: " + data.getString("word"));
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
            "https://minhqnd.com/api/dictionary/lookup?word=%s", word);
        
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
