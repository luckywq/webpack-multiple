import '../../public/common.scss';
import './index.scss';
import './index.html';
import 'animate.css';
import '@/css/bootstrap.min.css';

console.log('home');

$('button').click(() => {
	$('.test').eq(0).addClass('animated shake');
});
