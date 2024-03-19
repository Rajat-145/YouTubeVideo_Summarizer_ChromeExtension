from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as palm

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    video_link = data.get('video_link')
    
    if not video_link:
        return jsonify({'error': 'Video link not provided'}), 400
    
    video_id = video_link.split("=")[-1]
    
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        doc = ""
        for line in transcript:
            doc += ' ' + line['text']
    except Exception as e:
        return jsonify({'error': f'Failed to retrieve transcript: {str(e)}'}), 500
    
    palm.configure(api_key='YOUR OWN PALM API KEY')
    models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
    if not models:
        return jsonify({'error': 'No models available'}), 500
    
    model = models[0].name
    prompt = f"Summarize this to 200 words{doc} "

    try:
        completion = palm.generate_text(
            model=model,
            prompt=prompt,
            temperature=0,
            max_output_tokens=800,
        )
        return jsonify({'summary': completion.result}), 200
    except Exception as e:
        return jsonify({'error': f'Summarization failed: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True)
