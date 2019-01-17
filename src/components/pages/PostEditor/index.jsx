import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/TagFaces';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppBar from '../../organisms/AppBar';
import 'emoji-mart/css/emoji-mart.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    padding: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
  textFieldWrapper: {
    position: 'relative',
  },
  picker: {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: '1300',
  },
});

class PostEditor extends Component {
  state = {
    text: '',
    cursorPosition: 0,
    showPicker: false,
  };

  textareaRef = React.createRef();

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  addEmoji = emoji => {
    this.setState(prevState => {
      const textBefore = prevState.text.slice(0, prevState.cursorPosition);
      const textAfter = prevState.text.slice(prevState.cursorPosition);
      return { text: textBefore + emoji.native + textAfter };
    });
  };

  handleBlur = event => {
    this.setState({ cursorPosition: event.target.selectionStart });
  };

  handleClick = event => {
    const rawText = this.textareaRef.current.value;
    const text = rawText.replace(/\s*\n{2,}/g, '\n⠀\n').replace(/\s+\n/g, '\n');
    this.setState({ text }, () => {
      this.textareaRef.current.select();
      document.execCommand('copy');
      alert('Text was successfully converted and copied to your clipboard');
    });
  };

  handleTogglePicker = () => {
    this.setState(prevState => ({ showPicker: !prevState.showPicker }));
  };

  handleClickAway = () => {
    this.setState(prevState => ({ showPicker: false }));
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <header>
          <AppBar />
        </header>
        <main>
          <Grid className={classes.root} container>
            <Grid item xs={12} sm={10}>
              <article>
                <header>
                  <Typography component="h1" variant="h6" gutterBottom>
                    Clean and beautiful line breaks for Instagram
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This tool allows you to add line breaks to Instagram without using awkward characters like '.' '-'
                    etc. Simply type your text as you want it to appear (with line breaks) then tap 'convert' and paste
                    to Instagram.
                  </Typography>
                </header>
                <div className={classes.textFieldWrapper}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Type here"
                    multiline
                    rows="22"
                    rowsMax="28"
                    className={classes.textField}
                    value={this.state.text}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    inputRef={this.textareaRef}
                    margin="none"
                    helperText={`${this.state.text.length} characters, max 2000 by Instagram rules`}
                    variant="outlined"
                  />
                  <ClickAwayListener onClickAway={this.handleClickAway}>
                    <div>
                      {this.state.showPicker && (
                        <div className={classes.picker}>
                          <Picker set="apple" onSelect={this.addEmoji} />
                        </div>
                      )}
                    </div>
                  </ClickAwayListener>
                </div>
              </article>
              <div className={classes.buttons}>
                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>
                  Convert
                </Button>
                <IconButton color="primary" aria-label="Emoji" onClick={this.handleTogglePicker}>
                  <FaceIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(PostEditor);
