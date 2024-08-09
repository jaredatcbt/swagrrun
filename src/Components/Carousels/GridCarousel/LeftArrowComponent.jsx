import styled from 'styled-components';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const StyledLeftArrow = styled(ArrowLeftIcon)`
z-index: 50;
`;

const LeftArrowComponent = () => {
    return ( 
        <StyledLeftArrow/>
     );
}
 
export default LeftArrowComponent;