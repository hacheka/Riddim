import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed, isObservable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {getColor} from './colorHandler';

interface TextSlice {
    text: string,
    numberOfWords: number
}

class SlicedText {
    paragraphs: TextSlice[][];
    constructor() {
        this.paragraphs = new Array<TextSlice[]>();
    }
}

class AppState {
    @observable originalText: string = "This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety.\nNow listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes, when I am certain the reader is rested, I will engage him with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals–sounds that say listen to this, it is important.\nSo write with a combination of short, medium and long sentences. Create a sound that pleases the reader's ear. Don't just write words. Write music.\nGary Provost";
    //@observable originalText: string = "One. Two two. Three three three. Four four four four. Five five five five five. Six six six six six six. Seven seven seven seven seven seven seven. Eight eight eight eight eight eight eight eight. Nine nine nine nine nine nine nine nine nine. 10 10 10 10 10 10 10 10 10 10. 11 11 11 11 11 11 11 11 11 11 11. 12 12 12 12 12 12 12 12 12 12 12 12. 13 13 13 13 13 13 13 13 13 13 13 13 13 13 13 13 13 13. 14 14 14 14 14 14 14 14 14 14 14 14 14 14. 15 15 15 15 15 15 15 15 15 15 15 15 15 15 15. 16 16 16 16 16 16 16 16 16 16 16 16 16 16 16 16. 17 17 17 17 17 17 17 17 17 17 17 17 17 17 17 17 17.";

    private separators: RegExp = /([!:?.;])/;
    
    constructor() {}
    
    setText (text) {
        console.log(text);
        this.originalText = text;
    }
    
    @computed get slicedText() {
        let slicedText: SlicedText = new SlicedText();
        
        this.originalText.split('\n').forEach(paragraph => {
            let rawSlices = paragraph.split(this.separators);
            let processedSlices: TextSlice[] = [];
            let i;
            for (i = 0; i < rawSlices.length; i++) {
                let sliceText = rawSlices[i].trim();
                if (sliceText) {
                    if (i + 1 < rawSlices.length && this.separators.test(rawSlices[i + 1])) {
                        sliceText += rawSlices[i + 1];
                        i++;
                    }
                    processedSlices.push({
                        text: sliceText,
                        numberOfWords: sliceText.split(/\s+|-/).length
                    });
                }
            }
            slicedText.paragraphs.push(processedSlices);
        });
        
        return slicedText;   
    }
}

@observer
class Editor extends React.Component<{appState: AppState}, {}> {
    render () {
        let paragraphs = this.props.appState.slicedText.paragraphs.map(slices => {
            let spans = slices.map(slice => {
                let style = {
                    backgroundColor: getColor(slice.numberOfWords)
                };
                return <span style={style}>{slice.text}</span>;
            });
            return <div className='paragraph'>{spans}</div>;
        });
        return (
            <div className='editor'>
                <div className='source-text'>
                    <div className='text-area-wrapper'>
                        <textarea className='source-input' defaultValue={this.props.appState.originalText}
                            onChange={e => this.props.appState.setText((e.target as any).value)}>
                        </textarea>
                    </div>
                </div>
                <div className='sliced-text'>
                    {paragraphs}
                </div>
            </div>
        );
    }
};


const appState =  new AppState();

ReactDOM.render(<Editor appState={appState} />, document.getElementById('content'));