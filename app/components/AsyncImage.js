import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AsyncImage extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            dataSrc: null,
        };
    }

    componentDidMount () {
        this.loadImage();
    }

    loadImage = async () => {
        const dataSrc = await import(`../assets/images/${this.props.src}`);

        this.setState({ dataSrc });
    }

    render () {
        if (!this.state.dataSrc) {
            return null;
        }

        return (
            <img
                className={this.props.className}
                src={this.state.dataSrc}
                alt={this.props.alt}
            />
        );
    }
}

AsyncImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

AsyncImage.defaultProps = {
    alt: '',
    className: '',
};

export default AsyncImage;
