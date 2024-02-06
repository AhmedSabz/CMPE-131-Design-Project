from textblob import TextBlob

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment_polarity = blob.sentiment.polarity
    if sentiment_polarity > 0:
        return "Positive"
    elif sentiment_polarity < 0:
        return "Negative"
    else:
        return "Neutral"
input_text = input("Enter the text: ")
sentiment = analyze_sentiment(input_text)
print(f"The sentiment of the text is: {sentiment}")

