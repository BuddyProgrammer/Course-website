import express from 'express' 
import { addUserRating, getUserCourseProgress, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js' 
import { getUserData } from '../controllers/userController.js' 

const userRouter = express.Router() 
userRouter.get('/data', getUserData) 
userRouter.get('/enrolled-courses', userEnrolledCourses) 
userRouter.post('/purchases', purchaseCourse) 
userRouter.post('update-course-progress', updateUserCourseProgress) 
userRouter.post('get-course-progress', getUserCourseProgress) 
userRouter.post('addRating', addUserRating) 

export default userRouter;