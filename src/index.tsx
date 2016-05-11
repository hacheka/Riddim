import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed, isObservable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

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
    @observable originalText: string = 'Esto es un texto';
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
                return <span>{slice.text} ({slice.numberOfWords})</span>;
            });
            return <div>{spans}</div>;
        });
        return (
            <div>
                <textarea defaultValue={this.props.appState.originalText}
                    onChange={e => this.props.appState.setText((e.target as any).value)}>
                </textarea>
                <div className='sliced-text'>
                    {paragraphs}
                </div>
            </div>
        );
    }
};


const appState =  new AppState();

ReactDOM.render(<Editor appState={appState} />, document.getElementById('root'));